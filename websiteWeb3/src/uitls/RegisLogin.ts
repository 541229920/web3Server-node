// import { ref, onMounted } from 'vue'
// import axios from 'axios'
// import router from '@/router';

// interface Form {
//     address: String,
//     user: String,
//     password: String
// }

// interface userData {
//     user: String,
//     address: String
// }

// const FormObjData = ref<Form>({})
// const userData = ref<userData>({})



// const CheckEventAxios = (api:any) => {
//     axios.post('http://localhost:8080/post/'+ api, FormObjData.value).then(res => {

//     console.log(FormObjData.value)
//         if(api == 'login'){
//             loginEvent(res)
//         }
//     }).catch(err => {
//         console.log(err)
//     })
// }

// const loginEvent = (res:any) => {
//     if (res.data.Validstatus) {
//         userData.value.address = res.data.userdata[0].address
//         userData.value.user = res.data.userdata[0].user
//         console.log(userData.value,'走了')
//         router.push('/')
//     }
// }

// export {
//     getMetaMaskAddress, CheckEventAxios, userData,FormObjData
// }



import { ref } from 'vue'
import { type FormInst, type FormItemInst, type FormItemRule, useMessage, type FormRules } from 'naive-ui'
import axios from 'axios'
import router from '@/router';

interface ModelType {
    username: string | null
    password: string | null
    reenteredPassword: string | null
    metamaskAddress: string | null
}

const formRef = ref<FormInst | null>(null)
const rPasswordFormItemRef = ref<FormItemInst | null>(null)
const message = useMessage()
const modelRef = ref<ModelType>({
    username: null,
    password: null,
    reenteredPassword: null,
    metamaskAddress: null
})
const model = modelRef


const getMetaMaskAddress = () => {
    if (window.ethereum) {
        window.ethereum.request({
            method: 'eth_requestAccounts'
        }).then((result: (string | null)[]) => {
            modelRef.value.metamaskAddress = result[0]
        })
    }
}


const validatePasswordStartWith = (
    rule: FormItemRule,
    value: string
): boolean => {
    return (
        !!modelRef.value.password &&
        modelRef.value.password.startsWith(value) &&
        modelRef.value.password.length >= value.length
    )
}

const validatePasswordSame = (rule: FormItemRule, value: string): boolean => {
    return value === modelRef.value.password
}

const rules: FormRules = {
    username: [
        {
            required: true,
            trigger: ['input', 'blur']
        }
    ],
    password: [
        {
            required: true,
            message: '请输入密码'
        }
    ],
    reenteredPassword: [
        {
            required: true,
            message: '请再次输入密码',
            trigger: ['input', 'blur']
        },
        {
            validator: validatePasswordStartWith,
            message: '两次密码输入不一致',
            trigger: 'input'
        },
        {
            validator: validatePasswordSame,
            message: '两次密码输入不一致',
            trigger: ['blur', 'password-input']
        }
    ]
}

const handlePasswordInput = () => {
    if (modelRef.value.reenteredPassword) {
        rPasswordFormItemRef.value?.validate({ trigger: 'password-input' })
    }
}
const handleValidateButtonClick = (e: MouseEvent) => {
    e.preventDefault()
    formRef.value?.validate((errors) => {
        if (!errors) {
            message.success('验证成功')
            // axios.post('http://localhost:8080/post/regis', model).then(res => {
            //     console.log(res)
            // }).catch(err => {
            //     console.log(err)
            // })
            console.log('1')
        } else {
            console.log(errors)
            message.error('验证失败')
        }
    })
}

export {
    rules, 
    model, 
    handlePasswordInput, 
    getMetaMaskAddress, 
    handleValidateButtonClick
}