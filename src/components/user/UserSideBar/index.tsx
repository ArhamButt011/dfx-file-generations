'use client'

import React from 'react'
import { useState, useEffect, useRef } from 'react'
// import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import useLocalStorage from '@/components/admin/hooks/useLocalStorage'
import SidebarItem from './SidebarItem'
import ClickOutside from '@/components/admin/ClickOutside'
import logo from '/public/images/user/home/sidebarLogo.svg'
// import WhiteGenerateIcon from '/public/images/user/sidebar/whiteGenerateIcon.svg'
// import GrayGenerateIcon from '/public/images/user/sidebar/grayGenerateIcon.svg'
// import WhiteDownloadIcon from '/public/images/user/sidebar/whiteDownloadIcon.svg'
// import GrayDownloadIcon from '/public/images/user/sidebar/GrayDownloadIcon.svg'
// import WhiteSubscriptionIcon from '/public/images/user/sidebar/whiteSubscriptionIcon.svg'
// import GraySubscriptionIcon from '/public/images/user/sidebar/GraySubcriptionIcon.svg'
// import GrayInstructionsIcon from '/public/images/user/sidebar/grayInstructionsIcon.svg'
import { useAuth } from '@/context/AuthContext'
import user from '/public/images/admin/dashboard/user.svg'
import { motion, AnimatePresence } from 'framer-motion'
import Modal from '@/components/UI/Modal'
import userImages from '/public/images/userImage.svg'
import Swal from 'sweetalert2'
import axios, { AxiosError } from 'axios'
import blackCross from '/public/images/blackCross.svg'
import WarningIcon from '/public/images/user/warning.svg'
import EditIcon from '/public/images/editIcon.svg'
import { FaEye } from 'react-icons/fa'
import { ClipLoader } from 'react-spinners'
import Label from '@/components/UI/Label'
import { LuEyeClosed } from 'react-icons/lu'
import Button from '@/components/UI/Button'
import Text from '@/components/UI/Text'

interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (arg: boolean) => void
  setIsBilingOpen: React.Dispatch<React.SetStateAction<boolean>>
}

interface UserPlan {
  plan_name: string
  duration: number
  user_id: string
  added_on: string
  expiry_on: string
  charges: number
  added_date: string
  expiry_date: string
}

// const menuGroups = [
//   {
//     menuItems: [
//       {
//         Whiteicon: GrayInstructionsIcon,
//         Grayicon: GrayInstructionsIcon,
//         label: 'Instructions',
//         route: '/instructions',
//       },
//       {
//         Whiteicon: WhiteGenerateIcon,
//         Grayicon: GrayGenerateIcon,
//         label: 'Generate DXF',
//         route: '/Generate_DXF',
//       },
//       {
//         Whiteicon: WhiteDownloadIcon,
//         Grayicon: GrayDownloadIcon,
//         label: 'Files History',
//         route: '/downloaded-files',
//       },

//       {
//         Whiteicon: WhiteSubscriptionIcon,
//         Grayicon: GraySubscriptionIcon,
//         label: 'Manage Subscription ',
//         route: '/subscription',
//       },
//     ],
//   },
// ]
const menuGroups = [
  {
    menuItems: [
      {
        icon: (
          <svg
            width="18"
            height="18"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M20 10.5625C20 16.0853 15.5228 20.5625 10 20.5625C4.47715 20.5625 0 16.0853 0 10.5625C0 5.03965 4.47715 0.5625 10 0.5625C15.5228 0.5625 20 5.03965 20 10.5625ZM10 16.3125C10.4142 16.3125 10.75 15.9767 10.75 15.5625V9.5625C10.75 9.14829 10.4142 8.8125 10 8.8125C9.58579 8.8125 9.25 9.14829 9.25 9.5625V15.5625C9.25 15.9767 9.58579 16.3125 10 16.3125ZM10 5.5625C10.5523 5.5625 11 6.01022 11 6.5625C11 7.11478 10.5523 7.5625 10 7.5625C9.44771 7.5625 9 7.11478 9 6.5625C9 6.01022 9.44771 5.5625 10 5.5625Z"
              fill="#797979"
            />
          </svg>
        ),
        iconNotActive: (
          <svg
            width="18"
            height="18"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M20 10.5625C20 16.0853 15.5228 20.5625 10 20.5625C4.47715 20.5625 0 16.0853 0 10.5625C0 5.03965 4.47715 0.5625 10 0.5625C15.5228 0.5625 20 5.03965 20 10.5625ZM10 16.3125C10.4142 16.3125 10.75 15.9767 10.75 15.5625V9.5625C10.75 9.14829 10.4142 8.8125 10 8.8125C9.58579 8.8125 9.25 9.14829 9.25 9.5625V15.5625C9.25 15.9767 9.58579 16.3125 10 16.3125ZM10 5.5625C10.5523 5.5625 11 6.01022 11 6.5625C11 7.11478 10.5523 7.5625 10 7.5625C9.44771 7.5625 9 7.11478 9 6.5625C9 6.01022 9.44771 5.5625 10 5.5625Z"
              fill="white"
            />
          </svg>
        ),

        label: 'Instructions',
        route: '/instructions',
      },
      {
        icon: (
          <svg
            width="18"
            height="18"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.385032 4.93833C-0.059204 5.86496 0.0967397 6.94873 0.408627 9.11628L0.637761 10.7087C1.0384 13.493 1.23871 14.8852 2.20457 15.7169C3.17042 16.5485 4.58688 16.5485 7.41981 16.5485H9.2381C12.071 16.5485 13.4875 16.5485 14.4533 15.7169C15.4192 14.8852 15.6195 13.493 16.0201 10.7087L16.2493 9.11628C16.5612 6.94873 16.7171 5.86496 16.2729 4.93833C15.8286 4.0117 14.8831 3.44844 12.992 2.32193L11.8537 1.64386C10.1364 0.620871 9.27775 0.109375 8.32895 0.109375C7.38016 0.109375 6.5215 0.620871 4.80419 1.64386L3.66591 2.32193C1.77482 3.44845 0.829268 4.0117 0.385032 4.93833ZM5.24669 13.2605C5.24669 12.9201 5.5227 12.6441 5.86316 12.6441H10.7949C11.1354 12.6441 11.4114 12.9201 11.4114 13.2605C11.4114 13.601 11.1354 13.877 10.7949 13.877H5.86316C5.5227 13.877 5.24669 13.601 5.24669 13.2605Z"
              fill="#797979"
            />
          </svg>
        ),
        iconNotActive: (
          <svg
            width="18"
            height="18"
            viewBox="0 0 17 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.765891 5.47349C0.321655 6.40012 0.477599 7.48389 0.789486 9.65143L1.01862 11.2439C1.41926 14.0282 1.61957 15.4203 2.58543 16.252C3.55128 17.0837 4.96774 17.0837 7.80067 17.0837H9.61896C12.4519 17.0837 13.8683 17.0837 14.8342 16.252C15.8001 15.4203 16.0004 14.0282 16.401 11.2439L16.6301 9.65144C16.942 7.48389 17.098 6.40012 16.6537 5.47349C16.2095 4.54686 15.2639 3.9836 13.3728 2.85708L12.2346 2.17902C10.5173 1.15603 9.65861 0.644531 8.70981 0.644531C7.76102 0.644531 6.90236 1.15603 5.18505 2.17902L4.04677 2.85709C2.15568 3.9836 1.21013 4.54686 0.765891 5.47349ZM5.62755 13.7957C5.62755 13.4552 5.90355 13.1792 6.24402 13.1792H11.1758C11.5162 13.1792 11.7922 13.4552 11.7922 13.7957C11.7922 14.1361 11.5162 14.4122 11.1758 14.4122H6.24402C5.90355 14.4122 5.62755 14.1361 5.62755 13.7957Z"
              fill="white"
            />
          </svg>
        ),

        label: 'Generate DXF',
        route: '/Generate_DXF',
      },
      {
        icon: (
          <svg
            width="20"
            height="20"
            viewBox="0 0 28 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.333 3.35547C16.4104 3.35547 16.4846 3.3862 16.5392 3.4409C16.5939 3.49559 16.6247 3.56978 16.6247 3.64714V10.2353C16.6247 10.7183 17.0167 11.1103 17.4997 11.1103H22.7497C22.827 11.1103 22.9012 11.141 22.9559 11.1957C23.0106 11.2504 23.0413 11.3246 23.0413 11.402V22.8971C23.0413 23.748 22.7033 24.5641 22.1016 25.1658C21.5 25.7674 20.6839 26.1055 19.833 26.1055H8.16634C7.31544 26.1055 6.49939 25.7674 5.89771 25.1658C5.29603 24.5641 4.95801 23.748 4.95801 22.8971V6.5638C4.95801 5.7129 5.29603 4.89685 5.89771 4.29517C6.49939 3.69349 7.31544 3.35547 8.16634 3.35547H16.333Z"
              fill="#797979"
            />
            <path
              d="M18.767 3.80719C18.6002 3.67302 18.375 3.80952 18.375 4.02419V9.06769C18.375 9.22869 18.5057 9.35936 18.6667 9.35936H22.5143C22.652 9.35936 22.7383 9.21469 22.659 9.10269L19.1427 4.20619C19.0354 4.05735 18.9091 3.92321 18.767 3.80719Z"
              fill="#797979"
            />
          </svg>
        ),
        iconNotActive: (
          <svg
            width="18"
            height="18"
            viewBox="0 0 28 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.333 3.35547C16.4104 3.35547 16.4846 3.3862 16.5392 3.4409C16.5939 3.49559 16.6247 3.56978 16.6247 3.64714V10.2353C16.6247 10.7183 17.0167 11.1103 17.4997 11.1103H22.7497C22.827 11.1103 22.9012 11.141 22.9559 11.1957C23.0106 11.2504 23.0413 11.3246 23.0413 11.402V22.8971C23.0413 23.748 22.7033 24.5641 22.1016 25.1658C21.5 25.7674 20.6839 26.1055 19.833 26.1055H8.16634C7.31544 26.1055 6.49939 25.7674 5.89771 25.1658C5.29603 24.5641 4.95801 23.748 4.95801 22.8971V6.5638C4.95801 5.7129 5.29603 4.89685 5.89771 4.29517C6.49939 3.69349 7.31544 3.35547 8.16634 3.35547H16.333Z"
              fill="white"
            />
            <path
              d="M18.767 3.80719C18.6002 3.67302 18.375 3.80952 18.375 4.02419V9.06769C18.375 9.22869 18.5057 9.35936 18.6667 9.35936H22.5143C22.652 9.35936 22.7383 9.21469 22.659 9.10269L19.1427 4.20619C19.0354 4.05735 18.9091 3.92321 18.767 3.80719Z"
              fill="white"
            />
          </svg>
        ),

        label: 'Files History',
        route: '/downloaded-files',
      },
      {
        icon: (
          <svg
            width="19"
            height="18"
            viewBox="0 0 21 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M18.8577 5.09503C18.804 5.09163 18.7455 5.09165 18.6848 5.09168L18.6697 5.09168H16.2906C14.3296 5.09168 12.6516 6.63528 12.6516 8.64823C12.6516 10.6612 14.3296 12.2048 16.2906 12.2048H18.6697L18.6848 12.2048C18.7455 12.2048 18.804 12.2048 18.8577 12.2014C19.6543 12.1511 20.3587 11.5278 20.4179 10.6572C20.4218 10.6001 20.4218 10.5385 20.4217 10.4815L20.4217 10.466V6.83044L20.4217 6.81496C20.4218 6.75792 20.4218 6.69638 20.4179 6.63929C20.3587 5.76865 19.6543 5.14532 18.8577 5.09503ZM16.0796 9.59663C16.5845 9.59663 16.9937 9.17201 16.9937 8.64822C16.9937 8.12443 16.5845 7.69981 16.0796 7.69981C15.5747 7.69981 15.1655 8.12443 15.1655 8.64822C15.1655 9.17201 15.5747 9.59663 16.0796 9.59663Z"
              fill="black"
              fill-opacity="0.5"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M18.6842 13.6274C18.8256 13.6237 18.9326 13.7547 18.8942 13.8909C18.7038 14.5665 18.4017 15.1424 17.9168 15.6274C17.207 16.3371 16.307 16.6521 15.1951 16.8016C14.1146 16.9469 12.7341 16.9468 10.9911 16.9468H8.9873C7.24434 16.9468 5.8638 16.9469 4.78335 16.8016C3.67141 16.6521 2.77142 16.3371 2.06166 15.6274C1.3519 14.9176 1.03692 14.0176 0.887423 12.9057C0.742161 11.8252 0.742173 10.4447 0.742188 8.70173V8.59472C0.742173 6.85176 0.742161 5.47122 0.887423 4.39078C1.03692 3.27884 1.3519 2.37884 2.06166 1.66908C2.77142 0.959326 3.67141 0.644341 4.78335 0.494845C5.8638 0.349583 7.24434 0.349595 8.98729 0.34961L10.9911 0.34961C12.7341 0.349595 14.1146 0.349583 15.1951 0.494845C16.307 0.644341 17.207 0.959325 17.9168 1.66908C18.4017 2.15399 18.7038 2.72988 18.8942 3.40557C18.9326 3.54173 18.8256 3.67272 18.6842 3.66906L16.2905 3.66906C13.6002 3.66906 11.2289 5.79436 11.2289 8.64823C11.2289 11.5021 13.6002 13.6274 16.2905 13.6274L18.6842 13.6274ZM4.29874 4.14326C3.90589 4.14326 3.58743 4.46172 3.58743 4.85457C3.58743 5.24742 3.90589 5.56588 4.29874 5.56588H8.09239C8.48523 5.56588 8.8037 5.24742 8.8037 4.85457C8.8037 4.46172 8.48523 4.14326 8.09239 4.14326H4.29874Z"
              fill="black"
              fill-opacity="0.5"
            />
          </svg>
        ),
        iconNotActive: (
          <svg
            width="19"
            height="18"
            viewBox="0 0 21 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M18.8577 5.65753C18.804 5.65413 18.7455 5.65415 18.6848 5.65418L18.6697 5.65418H16.2906C14.3296 5.65418 12.6516 7.19778 12.6516 9.21073C12.6516 11.2237 14.3296 12.7673 16.2906 12.7673H18.6697L18.6848 12.7673C18.7455 12.7673 18.804 12.7673 18.8577 12.7639C19.6543 12.7136 20.3587 12.0903 20.4179 11.2197C20.4218 11.1626 20.4218 11.101 20.4217 11.044L20.4217 11.0285V7.39294L20.4217 7.37746C20.4218 7.32042 20.4218 7.25888 20.4179 7.20179C20.3587 6.33115 19.6543 5.70782 18.8577 5.65753ZM16.0796 10.1591C16.5845 10.1591 16.9937 9.73451 16.9937 9.21072C16.9937 8.68693 16.5845 8.26231 16.0796 8.26231C15.5747 8.26231 15.1655 8.68693 15.1655 9.21072C15.1655 9.73451 15.5747 10.1591 16.0796 10.1591Z"
              fill="white"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M18.6842 14.1899C18.8256 14.1862 18.9326 14.3172 18.8942 14.4534C18.7038 15.129 18.4017 15.7049 17.9168 16.1899C17.207 16.8996 16.307 17.2146 15.1951 17.3641C14.1146 17.5094 12.7341 17.5093 10.9911 17.5093H8.9873C7.24434 17.5093 5.8638 17.5094 4.78335 17.3641C3.67141 17.2146 2.77142 16.8996 2.06166 16.1899C1.3519 15.4801 1.03692 14.5801 0.887423 13.4682C0.742161 12.3877 0.742173 11.0072 0.742188 9.26423V9.15722C0.742173 7.41426 0.742161 6.03372 0.887423 4.95328C1.03692 3.84134 1.3519 2.94134 2.06166 2.23158C2.77142 1.52183 3.67141 1.20684 4.78335 1.05735C5.8638 0.912083 7.24434 0.912095 8.98729 0.91211L10.9911 0.91211C12.7341 0.912095 14.1146 0.912083 15.1951 1.05734C16.307 1.20684 17.207 1.52182 17.9168 2.23158C18.4017 2.71649 18.7038 3.29238 18.8942 3.96807C18.9326 4.10423 18.8256 4.23522 18.6842 4.23156L16.2905 4.23156C13.6002 4.23156 11.2289 6.35686 11.2289 9.21073C11.2289 12.0646 13.6002 14.1899 16.2905 14.1899L18.6842 14.1899ZM4.29874 4.70576C3.90589 4.70576 3.58743 5.02422 3.58743 5.41707C3.58743 5.80992 3.90589 6.12838 4.29874 6.12838H8.09239C8.48523 6.12838 8.8037 5.80992 8.8037 5.41707C8.8037 5.02422 8.48523 4.70576 8.09239 4.70576H4.29874Z"
              fill="white"
            />
          </svg>
        ),
        label: 'Manage Subscription ',
        route: '/subscription',
      },
    ],
  },
]

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
}: // setIsBilingOpen,
SidebarProps) => {
  // const pathname = usePathname()
  const [pageName, setPageName] = useLocalStorage('selectedMenu', 'dashboard')
  const [lastName, setLastName] = useState('')

  useEffect(() => {
    document.title = `${pageName} | Lumashape`
  }, [pageName])
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { logout, userData, setUserData } = useAuth()
  const [userPlan, setUserPlan] = useState<UserPlan | null>(null)
  console.log(userPlan)
  const handleLogoutClick = () => {
    logout()
    window.location.href = '/user'
  }
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false)
  const [showOldPassword, setShowOldPassword] = useState<boolean>(false)
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
  const [passwordOpen, setPasswordOpen] = useState<boolean>(false)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [profileImage, setProfileImage] = useState(userImages) // Set initial image
  const [file, setFile] = useState<File | undefined>(undefined)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const userId = userData?.id

  useEffect(() => {
    async function fetchUserPlan() {
      try {
        const response = await fetch('/api/user/get-user-plan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: userId }),
        })

        const data = await response.json()
        if (data?.subscription) {
          setUserPlan(data.subscription)
        }
      } catch (error) {
        console.error('Error fetching user plan:', error)
      }
    }

    if (userId) {
      fetchUserPlan()
    }
  }, [userId])
  const onEditClose = () => {
    setIsEditOpen(false)
  }

  const handleChangePassword = () => {
    setPasswordOpen(true)
    console.log(passwordOpen)
  }

  const onPasswordClose = () => {
    setPasswordOpen(false)
  }

  const handleEditClick = () => {
    setIsEditOpen(true)
  }

  const handleUpdatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (newPassword !== confirmPassword) {
        Swal.fire({
          title: 'Error!',
          text: 'The Passwords are not same',
          icon: 'error',
          showConfirmButton: false,
          timer: 2000,
          didOpen: () => {
            const swalContainer = document.querySelector(
              '.swal2-container',
            ) as HTMLElement
            if (swalContainer) {
              swalContainer.style.setProperty('z-index', '1000000', 'important')
            }
          },
        })
        return
      }
      // if (!userData) {
      //   alert('User id not found')
      //   return
      // }
      const id = userData?.id

      const response = await axios.put('/api/admin/change-password', {
        id,
        oldPassword,
        newPassword,
      })

      if (response.data.error) {
        Swal.fire({
          title: 'Error!',
          text: response?.data?.error ?? 'An unknown error occurred',
          icon: 'error',
          showConfirmButton: false,
          timer: 2000,
          didOpen: () => {
            const swalContainer = document.querySelector(
              '.swal2-container',
            ) as HTMLElement
            if (swalContainer) {
              swalContainer.style.setProperty('z-index', '1000000', 'important')
            }
          },
        })
      } else {
        Swal.fire({
          title: 'Success',
          text: 'Password Update Successfully',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          didOpen: () => {
            const swalContainer = document.querySelector(
              '.swal2-container',
            ) as HTMLElement
            if (swalContainer) {
              swalContainer.style.setProperty('z-index', '1000000', 'important')
            }
          },
        })
        onPasswordClose()
        setOldPassword('')
        setNewPassword('')
        setConfirmPassword('')
        setShowConfirmPassword(false)
        setShowNewPassword(false)
        setShowOldPassword(false)
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log('api error', error.response?.data?.error)

        Swal.fire({
          title: 'Error!',
          text: error.response?.data?.error ?? 'An unknown error occurred',
          icon: 'error',
          showConfirmButton: false,
          timer: 2000,
          didOpen: () => {
            const swalContainer = document.querySelector(
              '.swal2-container',
            ) as HTMLElement
            if (swalContainer) {
              swalContainer.style.setProperty('z-index', '1000000', 'important')
            }
          },
        })
      }
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const profileImage = e.target.files?.[0]
    if (profileImage) {
      setFile(profileImage)
      const imageUrl = URL.createObjectURL(profileImage)
      setProfileImage(imageUrl)
    }
  }

  const handleSubmit1 = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // if (!file) {
    //   Swal.fire({
    //     title: 'Error!',
    //     text: 'Please select a file first.',
    //     icon: 'error',
    //     showConfirmButton: false,
    //     timer: 2000,
    //   })
    //   return
    // }
    if (!userData) {
      Swal.fire({
        title: 'Error!',
        text: 'User id not found',
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
        didOpen: () => {
          const swalContainer = document.querySelector(
            '.swal2-container',
          ) as HTMLElement
          if (swalContainer) {
            swalContainer.style.setProperty('z-index', '100000', 'important')
          }
        },
      })
      return
    }
    const id = userData.id

    const formData = new FormData()
    if (file) {
      formData.append('file', file)
    }
    formData.append('name', name)
    formData.append('lastName', lastName)
    formData.append('id', id)
    setLoading(true)

    try {
      const response = await fetch('/api/admin/edit-profile', {
        method: 'PUT',
        body: formData,
      })

      const data = await response.json()
      console.log(data)

      if (data.status === 'success') {
        const newToken = data?.token
        if (newToken) {
          localStorage.setItem('token', newToken)
        }

        setUserData((prevData) => ({
          ...prevData,
          id: prevData?.id || '',
          name: prevData?.name || '',
          email: prevData?.email || '',
          role: prevData?.role || '',
          username: data.data.name,
          lastName: data.data.lastName,
          image: data.data.image,
        }))

        Swal.fire({
          title: 'Success',
          text: 'Data Updated Successfully',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          didOpen: () => {
            const swalContainer = document.querySelector(
              '.swal2-container',
            ) as HTMLElement
            if (swalContainer) {
              swalContainer.style.setProperty('z-index', '1000000', 'important')
            }
          },
        })
        setName('')
        setProfileImage(userImages)
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'File upload failed!',
          icon: 'error',
          showConfirmButton: false,
          timer: 2000,
        })
      }
    } catch (error) {
      console.error('Error:', error)
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred during file upload.',
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
        didOpen: () => {
          const swalContainer = document.querySelector(
            '.swal2-container',
          ) as HTMLElement
          if (swalContainer) {
            swalContainer.style.setProperty('z-index', '1000000', 'important')
          }
        },
      })
    } finally {
      setLoading(false)
      setIsEditOpen(false)
    }
  }

  useEffect(() => {
    if (userData) {
      setName(userData.username || '')
      setLastName(userData.lastName || '')
      setProfileImage(userData.image || userImages)
    }
  }, [userData])

  const handleDelete = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/user/DeleteUser', {
        method: 'DELETE',
        body: JSON.stringify({ id: userData?.id }),
      })
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Error Deleting user')
      }
      setIsDeleteOpen(false)
      handleLogoutClick()
    } catch (err) {
      Swal.fire({
        title: 'Error!',
        text: err instanceof Error ? err.message : String(err),
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
        didOpen: () => {
          const swalContainer = document.querySelector(
            '.swal2-container',
          ) as HTMLElement
          if (swalContainer) {
            swalContainer.style.setProperty('z-index', '1000000', 'important')
          }
        },
      })
    } finally {
      setLoading(false)
    }
  }

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }
  return (
    <>
      <ClickOutside onClick={() => setSidebarOpen(false)}>
        <aside
          className={`fixed left-0 top-0 z-9999 flex min-h-screen max-h-auto md:w-72.5 w-full flex-col overflow-y-auto bg-[#F8F8F8] duration-300 ease-linear dark:bg-boxdark lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between gap-2 px-6 pt-5.5 lg:pt-6.5">
            <Link href="/">
              <Image width={176} height={32} src={logo} alt="Logo" priority />
            </Link>

            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-controls="sidebar"
              className="block lg:hidden"
            >
              <Image
                src="/images/user/home/NavbarCross.svg"
                alt="cross"
                width={20}
                height={20}
              />
            </button>
          </div>

          <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear min-h-screen max-h-auto pb-10">
            <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
              {menuGroups.map((group, groupIndex) => (
                <div key={groupIndex}>
                  <ul className="mb-6 flex flex-col gap-1.5">
                    {group.menuItems.map((menuItem, menuIndex) => (
                      <SidebarItem
                        key={menuIndex}
                        item={menuItem}
                        pageName={pageName}
                        setPageName={setPageName}
                      />
                    ))}
                  </ul>
                </div>
              ))}
            </nav>

            {/* {userPlan &&
              userPlan.plan_name !== 'Free' &&
              userPlan.plan_name !== 'Premium' && (
                <div className="bg-[#FFFFFF] flex flex-col justify-center rounded-2xl mx-5 p-5 mb-5">
                  <div>
                    <h1 className="font-medium text-xl mb-2">New Update</h1>
                  </div>
                  <div className="flex justify-between items-center mx-2">
                    <span className="text-[#00000066] text-sm">
                      Upgrade to Premium to unlock unlimited downloads and
                      exclusive customer support
                    </span>
                    <span>
                      <svg
                        width="59"
                        height="50"
                        viewBox="0 0 59 50"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M57.0244 1.4129C56.9412 1.10105 56.621 0.915666 56.3091 0.998826L51.2273 2.35399C50.9154 2.43715 50.73 2.75736 50.8132 3.06921C50.8964 3.38106 51.2166 3.56645 51.5284 3.48329L56.0456 2.2787L57.2502 6.79591C57.3334 7.10776 57.6536 7.29314 57.9654 7.20999C58.2773 7.12683 58.4627 6.80661 58.3795 6.49476L57.0244 1.4129ZM1.44873 49.7763L18.2502 20.8404L17.2395 20.2535L0.437992 49.1894L1.44873 49.7763ZM23.5995 21.5516L27.9956 37.9639L29.1246 37.6615L24.7284 21.2492L23.5995 21.5516ZM35.4872 38.9551L56.9654 1.85627L55.954 1.27068L34.4757 38.3695L35.4872 38.9551ZM27.9956 37.9639C28.938 41.4821 33.6623 42.1071 35.4872 38.9551L34.4757 38.3695C33.1722 40.6209 29.7977 40.1745 29.1246 37.6615L27.9956 37.9639ZM18.2502 20.8404C19.5557 18.5921 22.9268 19.0403 23.5995 21.5516L24.7284 21.2492C23.7867 17.7334 19.0671 17.1059 17.2395 20.2535L18.2502 20.8404Z"
                          fill="#266CA8"
                        />
                      </svg>
                    </span>
                  </div>
                  <div className="text-center mt-3 cursor-pointer">
                    <div
                      className="bg-[#266CA8] text-white rounded-2xl py-1 font-semibold"
                      onClick={() => setIsBilingOpen(true)}
                    >
                      Upgrade
                    </div>
                  </div>
                </div>
              )} */}

            <div className="lg:hidden flex justify-center">
              <div
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="relative"
              >
                <Link
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-4 justify-center"
                  href="#"
                >
                  {userData?.image ? (
                    <div className="w-[44px] h-[44px] rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        width={44}
                        height={44}
                        src={userData.image}
                        className="w-full h-full object-cover"
                        alt="User"
                      />
                    </div>
                  ) : (
                    <div className="w-[44px] h-[44px] text-[26.86px] flex items-center justify-center bg-[#F2F2F2] rounded-full text-[#266CA8] font-bold">
                      {userData?.username?.charAt(0).toUpperCase()}
                    </div>
                  )}

                  <span className="lg:hidden text-left">
                    <span className="block text-[14px] font-semibold text-black dark:text-white">
                      {userData?.username} {userData?.lastName}
                    </span>
                    <span className="block text-xs font-normal text-[#00000066]">
                      {userData?.email}
                    </span>
                  </span>
                  <svg
                    style={{
                      transform: dropdownOpen
                        ? 'rotate(360deg)'
                        : 'rotate(270deg)',
                    }}
                    className="fill-current sm:block transition-transform duration-300"
                    width="12"
                    height="14"
                    viewBox="0 0 12 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
                      fill="#266CA8"
                    />
                  </svg>
                </Link>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute -bottom-86 sm:bottom-15 right-0 mt-4 flex w-50 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
                    >
                      <div className=" flex justify-center flex-col items-center py-3">
                        <span className="h-18 w-18 text-center rounded-full">
                          {userData?.image ? (
                            <Image
                              width={100}
                              height={100}
                              className="rounded-full"
                              src={userData?.image ? userData.image : user}
                              style={{
                                width: '100%',
                                height: '100%',
                              }}
                              alt="User"
                            />
                          ) : (
                            <div className="w-[80px] h-[80px] flex items-center justify-center bg-[#F2F2F2] rounded-full text-[#266CA8] font-semibold text-[42.21px]">
                              {userData?.username?.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </span>
                        <span className="text-center lg:block">
                          <span className="block text-[14px] font-semibold text-black dark:text-white mt-2">
                            {userData?.username} {userData?.lastName}
                          </span>
                          <span className="block  text-center text-xs font-normal text-[#00000066]">
                            {userData?.email}
                          </span>
                        </span>
                      </div>
                      <ul className="flex flex-col border-t border-gray-300 gap-3 px-6 py-5">
                        <li>
                          <Link
                            href="#"
                            className="flex items-center gap-2 text-sm font-medium duration-300 ease-in-out hover:text-[#266CA8] lg:text-base cursor-pointer"
                            onClick={() => {
                              handleEditClick()
                              setSidebarOpen(false)
                            }}
                          >
                            <svg
                              width="27"
                              height="27"
                              viewBox="0 0 27 27"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M5.60938 22.4318C5.60938 22.0601 5.91067 21.7589 6.28233 21.7589H20.6387C21.0104 21.7589 21.3116 22.0601 21.3116 22.4318C21.3116 22.8035 21.0104 23.1048 20.6387 23.1048H6.28233C5.91067 23.1048 5.60938 22.8035 5.60938 22.4318Z"
                                fill="black"
                              />
                              <path
                                d="M12.179 16.8867C12.4074 16.7086 12.6145 16.5014 13.0288 16.0871L18.3377 10.7783C17.6152 10.4775 16.7594 9.98356 15.95 9.1742C15.1405 8.36472 14.6465 7.50879 14.3458 6.78618L9.03683 12.0952L9.0368 12.0952C8.62253 12.5095 8.41538 12.7166 8.23723 12.945C8.02708 13.2144 7.84691 13.506 7.6999 13.8144C7.57528 14.0759 7.48265 14.3538 7.29737 14.9097L6.32033 17.8408C6.22916 18.1143 6.30035 18.4159 6.50423 18.6198C6.70811 18.8236 7.00968 18.8948 7.28321 18.8036L10.2143 17.8266C10.7701 17.6413 11.0481 17.5487 11.3095 17.4241C11.618 17.2771 11.9095 17.0969 12.179 16.8867Z"
                                fill="black"
                              />
                              <path
                                d="M19.8108 9.30512C20.9132 8.20276 20.9132 6.41549 19.8108 5.31313C18.7085 4.21077 16.9212 4.21077 15.8189 5.31313L15.1821 5.94986C15.1908 5.97619 15.1999 6.00289 15.2093 6.02993C15.4427 6.70262 15.883 7.58447 16.7114 8.41284C17.5397 9.24122 18.4216 9.68156 19.0943 9.91495C19.1212 9.92429 19.1478 9.93329 19.174 9.94197L19.8108 9.30512Z"
                                fill="black"
                              />
                            </svg>
                            Edit Profile
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="#"
                            className="flex items-center gap-2 text-sm font-medium duration-300 ease-in-out hover:text-[#266CA8] lg:text-base cursor-pointer"
                            onClick={() => {
                              handleChangePassword()
                              setSidebarOpen(false)
                            }}
                          >
                            <svg
                              width="27"
                              height="28"
                              viewBox="0 0 27 28"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M7.40246 12.334V10.4905C7.40246 7.14549 10.1141 4.43386 13.4591 4.43386C16.804 4.43386 19.5156 7.14549 19.5156 10.4905V12.334C20.5159 12.4087 21.1672 12.5973 21.6434 13.0734C22.4318 13.8618 22.4318 15.1308 22.4318 17.6686C22.4318 20.2065 22.4318 21.4754 21.6434 22.2639C20.855 23.0523 19.586 23.0523 17.0481 23.0523H9.86996C7.33209 23.0523 6.06316 23.0523 5.27474 22.2639C4.48633 21.4754 4.48633 20.2065 4.48633 17.6686C4.48633 15.1308 4.48633 13.8618 5.27474 13.0734C5.75086 12.5973 6.40223 12.4087 7.40246 12.334ZM8.74837 10.4905C8.74837 7.88881 10.8574 5.77977 13.4591 5.77977C16.0607 5.77977 18.1697 7.88881 18.1697 10.4905V12.2882C17.8261 12.285 17.4533 12.285 17.0481 12.285H9.86996C9.46483 12.285 9.09204 12.285 8.74837 12.2882V10.4905Z"
                                fill="black"
                              />
                            </svg>
                            Change Password
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="#"
                            className="flex items-center gap-2 text-sm font-medium duration-300 ease-in-out hover:text-[#266CA8] lg:text-base  cursor-pointer"
                            onClick={() => {
                              setIsDeleteOpen(true)
                              setSidebarOpen(false)
                            }}
                          >
                            <svg
                              width="27"
                              height="28"
                              viewBox="0 0 27 28"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12.8708 23.2932H13.5965C16.0934 23.2932 17.3418 23.2932 18.1535 22.48C18.9652 21.6667 19.0483 20.3327 19.2143 17.6646L19.4537 13.8202C19.5438 12.3726 19.5888 11.6488 19.1816 11.1901C18.7744 10.7314 18.0868 10.7314 16.7114 10.7314H9.75587C8.38055 10.7314 7.69289 10.7314 7.28568 11.1901C6.87847 11.6488 6.92353 12.3726 7.01365 13.8202L7.25297 17.6646C7.41906 20.3327 7.5021 21.6667 8.31381 22.48C9.12552 23.2932 10.3739 23.2932 12.8708 23.2932Z"
                                fill="#ED2A2A"
                              />
                              <path
                                d="M5.1582 9.08641C5.1582 8.67346 5.4681 8.33869 5.85038 8.33869L8.24093 8.33829C8.71591 8.32529 9.13493 7.99905 9.29655 7.5164C9.3008 7.50371 9.30569 7.48806 9.32321 7.43126L9.42622 7.09739C9.48925 6.89268 9.54417 6.71434 9.62101 6.55493C9.9246 5.92516 10.4863 5.48784 11.1354 5.37587C11.2997 5.34753 11.4736 5.34765 11.6734 5.34779H14.7941C14.9938 5.34765 15.1678 5.34753 15.3321 5.37587C15.9812 5.48784 16.5429 5.92516 16.8465 6.55493C16.9233 6.71434 16.9782 6.89268 17.0413 7.09739L17.1443 7.43126C17.1618 7.48806 17.1667 7.50371 17.1709 7.5164C17.3325 7.99905 17.8347 8.32569 18.3097 8.33869H20.6169C20.9992 8.33869 21.3091 8.67346 21.3091 9.08641C21.3091 9.49937 20.9992 9.83413 20.6169 9.83413H5.85038C5.4681 9.83413 5.1582 9.49937 5.1582 9.08641Z"
                                fill="#ED2A2A"
                              />
                            </svg>
                            Delete Account
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="#"
                            onClick={handleLogoutClick}
                            className="flex items-center gap-2 text-sm font-medium duration-300 ease-in-out hover:text-[#266CA8] lg:text-base cursor-pointer"
                          >
                            <svg
                              width="27"
                              height="28"
                              viewBox="0 0 27 28"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M17.5006 13.4442C17.64 13.5717 17.7194 13.752 17.7194 13.9409C17.7194 14.1298 17.64 14.3101 17.5006 14.4376L13.575 18.0267C13.3007 18.2774 12.875 18.2584 12.6243 17.9841C12.3735 17.7098 12.3925 17.2841 12.6668 17.0333L15.3131 14.6139L5.38194 14.6139C5.01028 14.6139 4.70898 14.3126 4.70898 13.9409C4.70898 13.5692 5.01028 13.2679 5.38194 13.2679L15.3131 13.2679L12.6668 10.8485C12.3925 10.5977 12.3735 10.172 12.6243 9.89772C12.875 9.62343 13.3007 9.60437 13.575 9.85515L17.5006 13.4442Z"
                                fill="#266CA8"
                              />
                              <path
                                d="M16.1492 21.3434C15.7775 21.3434 15.4763 21.6447 15.4763 22.0164C15.4763 22.388 15.7775 22.6893 16.1492 22.6893L16.1985 22.6893C17.4255 22.6893 18.4146 22.6893 19.1925 22.5848C20.0002 22.4762 20.6802 22.2439 21.2203 21.7038C21.7604 21.1637 21.9927 20.4837 22.1012 19.676C22.2058 18.8981 22.2058 17.9091 22.2058 16.682L22.2058 11.1999C22.2058 9.97275 22.2058 8.98367 22.1012 8.20576C21.9927 7.39812 21.7604 6.7181 21.2203 6.17801C20.6802 5.63793 20.0002 5.40563 19.1925 5.29705C18.4146 5.19246 17.4255 5.19248 16.1984 5.19249L16.1492 5.19249C15.7775 5.19249 15.4763 5.49379 15.4763 5.86545C15.4763 6.23711 15.7775 6.5384 16.1492 6.5384C17.4372 6.5384 18.3354 6.53983 19.0132 6.63096C19.6716 6.71947 20.0203 6.88138 20.2686 7.12972C20.5169 7.37805 20.6788 7.7267 20.7673 8.3851C20.8585 9.06285 20.8599 9.96113 20.8599 11.2491L20.8599 16.6327C20.8599 17.9207 20.8585 18.819 20.7673 19.4967C20.6788 20.1551 20.5169 20.5038 20.2686 20.7521C20.0203 21.0004 19.6716 21.1623 19.0132 21.2509C18.3354 21.342 17.4372 21.3434 16.1492 21.3434Z"
                                fill="#266CA8"
                              />
                            </svg>
                            Logout
                          </Link>
                        </li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </aside>
      </ClickOutside>
      <Modal isOpen={isEditOpen} onClose={onEditClose} buttonContent="">
        <form onSubmit={handleSubmit1}>
          {loading && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[100000]">
              <ClipLoader color="#007bff" size={50} />
            </div>
          )}
          <div className="flex items-center flex-col gap-6">
            <div className="flex justify-between items-center w-full mb-7">
              <Text as="h3" className="text-[#000000] text-center flex-grow">
                Edit Profile
              </Text>
              <div>
                <Image
                  className="cursor-pointer sm:w-[30px] sm:h-[30px]  w-[25px] h-[25px]"
                  src={blackCross}
                  alt="cross"
                  onClick={onEditClose}
                />
              </div>
            </div>
            <div className="relative inline-block">
              <Image
                src={profileImage}
                alt="userImage"
                className="rounded-full w-36 h-36 object-cover"
                onClick={handleImageClick}
                width={200}
                height={200}
              />
              <Image
                src={EditIcon}
                alt="editImage"
                className="absolute top-0 right-0 transform"
                onClick={handleImageClick}
              />
              <input
                type="file"
                ref={fileInputRef}
                accept=".jpg, .jpeg, .png"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
            <div className="w-full">
              <Label>First Name</Label>
              <div>
                <input
                  type="text"
                  placeholder="Enter First Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 sm:text-sm text-xs sm:py-3 py-3 mt-1 pr-10 border text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#005B97] rounded-full placeholder:text-sm placeholder:text-xs"
                  required
                />
              </div>
            </div>
            <div className="w-full">
              <Label>Last Name</Label>
              <div>
                <input
                  type="text"
                  placeholder="Enter Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 sm:text-sm text-xs sm:py-3 py-3 mt-1 pr-10 border text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#005B97] rounded-full placeholder:text-sm placeholder:text-xs"
                  required
                />
              </div>
            </div>
            <div className="w-full mt-4">
              <Button type="submit">Continue</Button>
            </div>
          </div>
        </form>
      </Modal>

      {/* change password */}
      <Modal isOpen={passwordOpen} onClose={onPasswordClose} buttonContent="">
        <div className="flex flex-col gap-4">
          {loading && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[100000]">
              <ClipLoader color="#007bff" size={50} />
            </div>
          )}
          <div className="flex justify-between items-center w-full mb-7">
            <Text as="h3" className="text-[#000000] text-center flex-grow">
              Change Password
            </Text>
            <div>
              <Image
                className="cursor-pointer sm:w-[30px] sm:h-[30px]  w-[25px] h-[25px]"
                src={blackCross}
                alt="cross"
                onClick={onPasswordClose}
              />
            </div>
          </div>
          <form onSubmit={handleUpdatePassword}>
            <div className="mb-3 relative">
              <Label>Old Password</Label>
              <div className="relative">
                <input
                  type={showOldPassword ? 'text' : 'password'}
                  placeholder="Enter Old Password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full px-4 sm:text-sm text-xs sm:py-3 py-3 mt-1 pr-10 border text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#005B97] rounded-full placeholder:text-sm placeholder:text-xs"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute inset-y-0 right-3 top-1/2 transform text-gray-500"
                  style={{ transform: 'translateY(-40%)' }}
                >
                  {showOldPassword ? (
                    <FaEye size={20} className="text-[#005B97] mr-2" />
                  ) : (
                    <LuEyeClosed size={20} className="text-[#005B97] mr-2" />
                  )}
                </button>
              </div>
            </div>
            <div className="mb-3 relative">
              <Label> New Password</Label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  placeholder="Enter new Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 sm:text-sm text-xs sm:py-3 py-3 mt-1 pr-10 border text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#005B97] rounded-full placeholder:text-sm placeholder:text-xs"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute inset-y-0 right-3 top-1/2 transform text-gray-500"
                  style={{ transform: 'translateY(-40%)' }}
                >
                  {showNewPassword ? (
                    <FaEye size={20} className="text-[#005B97] mr-2" />
                  ) : (
                    <LuEyeClosed size={20} className="text-[#005B97] mr-2" />
                  )}
                </button>
              </div>
            </div>
            <div className="mb-8 relative">
              <Label>Confirm New Password</Label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Enter new Password"
                  name="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 sm:text-sm text-xs sm:py-3 py-3 mt-1 pr-10 border text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#005B97] rounded-full placeholder:text-sm placeholder:text-xs"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-3 top-1/2 transform text-gray-500"
                  style={{ transform: 'translateY(-40%)' }}
                >
                  {showConfirmPassword ? (
                    <FaEye size={20} className="text-[#005B97] mr-2" />
                  ) : (
                    <LuEyeClosed size={20} className="text-[#005B97] mr-2" />
                  )}
                </button>
              </div>
            </div>
            <div>
              <Button type="submit">Update</Button>
            </div>
          </form>
        </div>
      </Modal>
      {/* delete */}
      <Modal isOpen={isDeleteOpen} onClose={onEditClose} buttonContent="">
        <div className="flex items-center flex-col gap-10">
          {loading && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[100000]">
              <ClipLoader color="#007bff" size={50} />
            </div>
          )}
          <div className="relative flex flex-col items-center">
            <Image
              src={WarningIcon}
              alt="userImage"
              className="rounded-full w-28 h-28 object-cover"
              onClick={handleImageClick}
              width={200}
              height={200}
            />
            <Text
              as="h3"
              className="text-[#000000] font-semibold text-center flex-grow"
            >
              <span className="text-[#266CA8]">Delete</span> Your Account?
            </Text>

            <Text className="text-center text-[#777777]">
              Are you sure you want to delete your account? All your downloaded
              files and subscription data will be lost
            </Text>
          </div>

          <div className="w-full flex gap-10 max-w-xs">
            <Button variant="outlined" onClick={() => setIsDeleteOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              className="font-normal text-white text-[14.56px] bg-[#266CA8] rounded-full p-5  w-full"
            >
              Yes I&apos;m Sure
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default Sidebar
