import { ref, onMounted } from 'vue'
import axios from 'axios'
import router from '@/router';

interface Form {
    address: String,
    user: String,
    password: String
}

interface userData {
    user: String,
    address: String
}

const FormObjData = ref<Form>({})
const userData = ref<userData>({})

const getMetaMaskAddress = () => {
    if (window.ethereum) {
        window.ethereum.request({
            method: 'eth_requestAccounts'
        }).then(result => {
            FormObjData.value.address = result[0]
        })
    }
}

const CheckEventAxios = (api:any) => {
    axios.post('http://localhost:8080/post/'+ api, FormObjData.value).then(res => {

    console.log(FormObjData.value)
        if(api == 'login'){
            loginEvent(res)
        }
    }).catch(err => {
        console.log(err)
    })
}

const loginEvent = (res:any) => {
    if (res.data.Validstatus) {
        userData.value.address = res.data.userdata[0].address
        userData.value.user = res.data.userdata[0].user
        console.log(userData.value,'走了')
        router.push('/')
    }
}

export {
    getMetaMaskAddress, CheckEventAxios, userData,FormObjData
}