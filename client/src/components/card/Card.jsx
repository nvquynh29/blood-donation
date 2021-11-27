import { Card } from 'antd'
import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

function CustomCard(props, { children }) {
  return (
    <div>
      <div class="max-w-md h-full mx-auto bg-white  shadow-md overflow-hidden md:max-w-2xl">
        <div class="md:flex flex-col">
          <div class="flex-shrink-0">
            <img
              class=" w-full object-cover h-full"
              src={props.imgUrl}
              alt="Man looking at item at a store"
            />
          </div>
          <div class="p-8">
            <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {props.subTitle ?? ''}
            </div>
            <Link href="/">
              <a
                href="/"
                class="block mt-1 text-3xl leading-tight font-medium font-Dosis text-black hover:underline"
              >
                {props.cardTitle ?? ''}
              </a>
            </Link>
            <p class="mt-2 font-Dosis text-gray-500 xl:text-xl lg:text-2xl md:text-base text-base h-auto ">
              {props.cardDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
CustomCard.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  cardTitle: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  cardTitleStyle: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  imgPosition: PropTypes.string.isRequired,
}
export default CustomCard
