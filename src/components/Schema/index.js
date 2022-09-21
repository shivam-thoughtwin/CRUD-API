import * as Yup from 'yup';

export const validation = Yup.object({
    name: Yup.string().min(2).max(25).required("Please Enter Your Name"),
    email: Yup.string().email().required("Please Enter Your Email"),
    phone: Yup.string().required("Please Enter Your Phone"),
});

export const registration = Yup.object({
    fname: Yup.string().min(2).max(30).required("Please Enter Your First Name"),
    lname: Yup.string().min(2).max(25).required("Please Enter Your Last Name"),
    uemail: Yup.string().email().required("Please Enter Your Email"),
    password: Yup.string().min(2).max(25).required("Please Enter Your Phone"),
})