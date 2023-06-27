'use client'

import { useState, useCallback } from 'react';
import { AiOutlineMenu } from 'react-icons/ai'
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Avatar from '../Avatar'
import MenuItem from './MenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { SafeUser } from '@/app/types';
import useRentModal from '@/app/hooks/useRentModal.';

interface UserMenuProps {
    currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({
    currentUser
}) => {

    const router = useRouter();
    const [toggle, setToggle] = useState(false);

    const onOpenRent = useRentModal((state) => state.onOpen);
    const onOpenRegister = useRegisterModal((state) => state.onOpen);
    const onOpenLogin = useLoginModal((state) => state.onOpen);

    const toggleOpen = useCallback(() => {
        setToggle(!toggle)
    }, [toggle])

    const onRent = useCallback(() => {
        if (!currentUser) return onOpenLogin();
        onOpenRent();
    }, [currentUser, onOpenLogin, onOpenRent])

    return (
        <div className="relative">
            <div
                className="
                    flex
                    items-center
                    gap-3
                "
            >
                <div
                    onClick={onRent}
                    className="
                        cursor-pointer
                        hidden
                        md:block
                        text-sm
                        font-semibold
                        py-3
                        px-4
                        rounded-full
                        transition
                        hover:bg-neutral-100
                    "
                >
                    Airbnb your home
                </div>
                <div
                    onClick={toggleOpen}
                    className='
                        p-4
                        md:py-1
                        md:px-2
                        rounded-full
                        border-[1px]
                        border-neutral-200
                        flex
                        items-center
                        gap-3
                        cursor-pointer
                        transition
                        hover:shadow-md
                '>
                    <AiOutlineMenu />
                    <div className='hidden md:block'>
                        <Avatar src={currentUser?.image} />
                    </div>
                </div>
            </div>
            {toggle && (
                <div
                    className='
                        absolute
                        rounded-xl
                        shadow-md
                        w-[40vw]
                        md:w-3/4
                        bg-white
                        overflow:hidden
                        right-0
                        top-12
                        text-sm
                        '
                >
                    <div className='flex flex-col cursor-pointer'>
                        {currentUser ? (
                            <>
                                <MenuItem
                                    onClick={() => router.push('/trips')}
                                    label='My trips'
                                />
                                <MenuItem
                                    onClick={() => router.push('/favorites')}
                                    label='My favorites'
                                />
                                <MenuItem
                                    onClick={() => router.push('/reservations')}
                                    label='My reservations'
                                />
                                <MenuItem
                                    onClick={() => router.push('/properties')}
                                    label='My properties'
                                />
                                <MenuItem
                                    onClick={onOpenRent}
                                    label='Airbnb my home'
                                />
                                <hr />
                                <MenuItem
                                    onClick={() => signOut()}
                                    label='Logout'
                                />
                            </>
                        ) : (
                            <>
                                <MenuItem
                                    onClick={onOpenLogin}
                                    label='Login'
                                />
                                <MenuItem
                                    onClick={onOpenRegister}
                                    label='Sign Up'
                                />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserMenu