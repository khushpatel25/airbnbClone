'use client'

import { useState, useCallback } from 'react';
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { signIn } from 'next-auth/react';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import Button from '../Button';
import useLoginModal from '@/app/hooks/useLoginModal';
import LoginModal from './LoginModal';

const RegisterModal = () => {

    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/register', data)
            .then(() => {
                toast.success("Successfully registered!");
                registerModal.onClose();
                loginModal.onOpen();
            })
            .catch((err) => {
                toast.error('Something went wrong.')
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const toggleModal = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen()
    }, [loginModal, registerModal])

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading
                title='Welcome to Airbnb'
                subtitle='Create an account!'
            />
            <Input
                id='email'
                label='Email'
                type='email'
                required
                disabled={isLoading}
                register={register}
                errors={errors}
            />
            <Input
                id='name'
                label='Name'
                required
                disabled={isLoading}
                register={register}
                errors={errors}
            />
            <Input
                id='password'
                label='Password'
                type='password'
                required
                disabled={isLoading}
                register={register}
                errors={errors}
            />
        </div>
    )

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <Button
                label='Continue with Google'
                onClick={() => signIn('google')}
                icon={FcGoogle}
                outline
            />
            <Button
                label='Continue with GitHub'
                onClick={() => signIn('github')}
                icon={AiFillGithub}
                outline
            />
            <div className='flex justify-center items-center gap-2'>
                <div>Already have an account?</div>
                <div
                    onClick={toggleModal}
                    className='cursor-pointer text-neutral-800 hover:underline'
                >
                    Log in
                </div>
            </div>
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            title='Register'
            actionLabel='Continue'
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default RegisterModal