import admin from "firebase-admin";
import ServiceAccout from "@/firebase-admin.json"
// const ServiceAccount = {
//     type: "service_account",
//     project_id: "pocketai-3431a",
//     private_key_id: "4664958b12dff43081058ad4504cb47afcd2677d",
//     private_key: `-----BEGIN PRIVATE KEY-----
//   MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCs4u1WEiHpkKZ4
//   xexEP8hphHKBXlTd2EDrGWqvg6iyiDvuow3yCnnhIjLuhKHk7JwTitGkwIInsUfc
//   bgjRr2cc3zxF/aT41PZIoJ0qqSQ40r/1hVnpaX/BnmkZ4qYjggHLcRRBugDuoEyP
//   LSye8MHWaXFBtwy1+yEWDBh9rqNvBkiAAt+1CF9eFolJgoFCG7A6CrRai7idDlEX
//   McfQjTPp6P5PYWOhDxbSk2mkRIMaE5S3EI+m7bBG9l+6jT4aQCeprIWhDUiruuAN
//   xiS5BY0jHXh/jF4TfFh9JVZmhWEtmnyPf98mK9we8Ip5FyfNjVhWyy45fBb4Q39l
//   4t4/L41pAgMBAAECggEABa/Aofc+d4/fE+Ohs/R7n3HgcM4lITdk2j7Hpi6A0N9/
//   hifFlIeg7uVosrT43L5mG1PydZZx6YOQoyjY4CnCbN4QXdZ8E8WwdJ7Y0I+H7hkL
//   gJRCavWiAsC2wQfWEl6rN7F4WrmXIII0BnUUTcWKQKbO93wBfmZcVhzvfMnO3R7U
//   SCXSH0km8nCv9er4m7am5EFLhOMUxXxD6DQA9wV1yckiyhAz8oqH/fnUwB35GjMH
//   g44UnQWx9iboz4oR84NIwwGGFIF+CHV9RJO+GnBA+qZgt99hD9smwa+VyP5fFnPe
//   /PBPbPNuRCvN2OlntCH57dFWKx9aV9HLPNZnNIjYgQKBgQDjDg5o7fzkRdnZic7r
//   BoCrJi3IVmtSpmzmfgYYXelPRSivTzmnWR2EDVYDAjn0kAsAve7iMh62XpbOAnmx
//   wHnLhMHkcGJT20/huP1emE0FudgWKPw1cFm8KTHghwzZaoOyxajYY/s5KTHc9feK
//   Q/g64tDWxoAbkgu5MbPPjjnE6QKBgQDC7RS/zTt2J7vncv3DfOCV11F3W7bcr1OC
//   JWQipCCJ3hsisdWkWg6ThtaO8We2ScTrXqyXQEArnJc2VwytGn4qllPEBwyKvQci
//   fEU6ExSbUJYNUkqDqvZ6cQk9x5TncYGmFFNptpVguY4pmsk0V5QRjpuWnnZh1pPO
//   Q4vgmvQ0gQKBgQC0ncjetXo3iE08nEBKe1i9TNichgpHq/XzAIsOtR3UHhq4Ihil
//   w+ET25vxNsMthawLAgvWSbJeti3WYOe3e3onaEro0nGVbV9FGugKaLLUfDqlniLK
//   y73GTSrNBgE1rmJnQo8G27nLhbaRo+QvS9RZ23Xvc+YSiIHk5uG3mNbhiQKBgQCC
//   IZSAl5rivpQLaBFRuMSWRDD25humKMYvVJcNKVUvtT+YYfCm0Bh7FMGYnEEIySbV
//   m1bNgu9ULi4k8OhdiBpChClX7PzKgneI5j2xD5vqNFp4ej+Ut0XlaCErRVp7SKOt
//   JFSrdmEzOa1WyScZ8n2/Wt00KIYPuxjh0uZHBCuUAQKBgDPzMPYhOYhtX1JrUUEp
//   IziESUKdXTW+p0dKQkwmDrT8ac08MzQzsQYQI9LsKEpNVCi8w2QIVK0FAOWN6ujT
//   QQef7kkjdflIsgAirUFqfCFc96Pt12wM4r30HQ7IZWV716yXIBnoIh1TexXUCrYz
//   7lZtf0gYPDATOyBwJXEzikQK
//   -----END PRIVATE KEY-----`,
//     client_email: "firebase-adminsdk-yusfu@pocketai-3431a.iam.gserviceaccount.com",
//     client_id: "116359876841569975719",
//     auth_uri: "https://accounts.google.com/o/oauth2/auth",
//     token_uri: "https://oauth2.googleapis.com/token",
//     auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
//     client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-yusfu%40pocketai-3431a.iam.gserviceaccount.com",
//     universe_domain: "googleapis.com"
// };

let FirebaseAdmin: admin.app.App;

if (!admin.apps.length) {
    FirebaseAdmin = admin.initializeApp({
        credential: admin.credential.cert(ServiceAccout as any)
    }, 'Admin')
} else {
    FirebaseAdmin = admin.apps[0] as admin.app.App
}


export default FirebaseAdmin