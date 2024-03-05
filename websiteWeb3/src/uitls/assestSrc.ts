
export class AssestSrc {

    UserPhotoUrl(name: String) {
        return new URL(`../images/user_photo/${name}.png`, import.meta.url).href
    }

    ChangeLogoUrl(name: String) {
        return new URL(`../images/header_logo/${name}.png`, import.meta.url).href
    }
}