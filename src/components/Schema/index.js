import * as Yup from 'yup';

export const validation = Yup.object({
    name: Yup.string().min(2).max(25).required("Please Enter Your Name"),
    email: Yup.string().email().required("Please Enter Your Email"),
    phone: Yup.number().required("Please Enter Your Phone"),
})