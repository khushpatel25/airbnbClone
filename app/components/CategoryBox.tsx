'use client'

import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import { useCallback } from 'react';
import { IconType } from 'react-icons';

interface CategoryBoxProps {
  selected?: boolean
  label: string
  icon: IconType
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  selected,
  label,
  icon: Icon
}) => {

  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {

    let currentQuery = {};

    // console.log(params?.toString())
    if (params) {
      currentQuery = qs.parse(params.toString())
    }
    // console.log({ currentQuery })

    const updatedQuery: any = {
      ...currentQuery,
      category: label
    }

    if (params?.get('category') === label) {
      delete updatedQuery.category
    }
    // console.log({ updatedQuery })

    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery
    }, { skipNull: true })
    // console.log({url})

    router.push(url)

  }, [label,router,params])

  return (
    <div
      onClick={handleClick}
      className={`
      flex
      flex-col
      justify-center
      items-center
      gap-2
      p-3
      transition
      border-b-2
      cursor-pointer
      hover:text-neutral-800
      ${selected ? 'border-b-neutral-800' : 'border-transparent'}
      ${selected ? 'text-neutral-800' : 'text-neutral-500'}
    `}>
      <Icon size={26} />
      <div className='font-medium text-sm'>
        {label}
      </div>
    </div>
  )
}

export default CategoryBox