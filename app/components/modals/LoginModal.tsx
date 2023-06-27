"use client";

import { useState, useCallback } from "react";
import { signIn } from "next-auth/react";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../Button";

const LoginModal = () => {

    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        signIn('credentials', {
            ...data,
            redirect: false,
        })
            .then((res) => {
                setIsLoading(false);
                if (res?.ok) {
                    toast.success("Logged in successfully")
                    router.refresh();
                    loginModal.onClose()
                }
                if (res?.error) {
                    toast.error(res.error)
                }
            })
    };

    const toggleModal = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen()
    }, [loginModal, registerModal])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Welcome back" subtitle="Login to your account!" />
            <Input
                id="email"
                label="Email"
                type="email"
                required
                disabled={isLoading}
                register={register}
                errors={errors}
            />
            <Input
                id="password"
                label="Password"
                type="password"
                required
                disabled={isLoading}
                register={register}
                errors={errors}
            />
        </div>
    );

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button
                label="Continue with Google"
                onClick={() => signIn('google')}
                icon={FcGoogle}
                outline
            />
            <Button
                label="Continue with GitHub"
                onClick={() => signIn('github')}
                icon={AiFillGithub}
                outline
            />
            <div className="flex justify-center items-center gap-2">
                <div>First time using Airbnb?</div>
                <div
                    onClick={toggleModal}
                    className="cursor-pointer text-neutral-800 hover:underline"
                >
                    Create an account
                </div>
            </div>
        </div>
    );

    // console.count('loginModal')

    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            title="Login"
            actionLabel="Continue"
            body={bodyContent}
            footer={footerContent}
        />
    );
};

export default LoginModal;
