import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ClickOutside from '../ClickOutside'
// import user from '/public/images/admin/dashboard/user.svg'
import Edit from '/public/images/admin/dashboard/edit.svg'
import Lock from '/public/images/admin/dashboard/lock.svg'
import Bell from '/public/images/admin/dashboard/bell.svg'
import arrow from '/public/images/admin/dashboard/arrowright.svg'
import LogoutImage from '/public/images/admin/dashboard/logout.svg'
import { useAuth } from '@/context/AuthContext'
import Modal from '@/components/UI/Modal'
import dltCircle from '/public/images/admin/allusers/dltCircle.svg'
import { FaEye } from 'react-icons/fa'
import blackCross from '/public/images/blackCross.svg'
import EditIcon from '/public/images/editIcon.svg'
import userImages from '/public/images/userImage.svg'
import axios, { AxiosError } from 'axios'
import Swal from 'sweetalert2'
import { ClipLoader } from 'react-spinners'
import { useNotification } from '@/context/NotificationContext'
import Text from '@/components/UI/Text'
import Button from '@/components/UI/Button'
import Label from '@/components/UI/Label'
import { LuEyeClosed } from 'react-icons/lu'

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false)
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
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const { logout } = useAuth()
  const { userData, setUserData } = useAuth()
  // const [isActive, setIsActive] = useState(false)
  const { isActive, toggleNotifications } = useNotification()

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  // useEffect(() => {
  //   const fetchStatus = async () => {
  //     try {
  //       const response = await fetch('/api/admin/get-enable-notification')
  //       const data = await response.json()
  //       if (response.ok) {
  //         setIsActive(data.isActive)
  //       }
  //     } catch (error) {
  //       console.error('Error fetching notification status:', error)
  //     }
  //   }
  //   fetchStatus()
  // }, [])

  // Function to handle toggle change
  // const handleToggle = async () => {
  //   const newStatus = !isActive
  //   setIsActive(newStatus)

  //   try {
  //     const response = await fetch('/api/admin/enable-notifications', {
  //       method: 'PUT',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ isActive: newStatus }),
  //     })

  //     if (!response.ok) {
  //       throw new Error('Failed to update notification status')
  //     }
  //   } catch (error) {
  //     console.error('Error updating notification status:', error)
  //     setIsActive(!newStatus)
  //   }
  // }

  useEffect(() => {
    if (userData) {
      setName(userData.username || '')
      setProfileImage(userData.image || userImages)
    }
  }, [userData])

  const handleLogoutClick = () => {
    setIsOpen(true)
  }

  const handleLogout = () => {
    logout()
    window.location.href = '/admin'
  }

  const onClose = () => {
    setIsOpen(false)
  }

  const onEditClose = () => {
    setIsEditOpen(false)
  }

  const handleChangePassword = () => {
    setPasswordOpen(true)
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
    formData.append('id', id)
    setLoading(true)
    try {
      const response = await fetch('/api/admin/edit-profile', {
        method: 'PUT',
        body: formData,
      })

      const data = await response.json()

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
          image: data.data.image,
        }))
        setIsEditOpen(false)

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
    }
  }

  return (
    <>
      <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
        <Link
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-4"
          href="#"
        >
          <span className="hidden text-right lg:block">
            <Text className="block text-black dark:text-white">
              {userData?.username}
            </Text>
            {/* <span className="block text-xs">UX Designer</span> */}
          </span>

          {userData?.image ? (
            <div className="w-[44px] h-[44px] rounded-full overflow-hidden flex-shrink-0">
              <Image
                width={44}
                height={44}
                src={`${process.env.NEXT_PUBLIC_SITE_URL}${userData.image}`}
                className="object-cover w-full h-full"
                alt="User"
              />
            </div>
          ) : (
            <div className="w-[44px] h-[44px] text-[26.86px] flex items-center justify-center bg-[#F2F2F2] rounded-full text-[#266CA8] font-bold">
              {userData?.username?.charAt(0).toUpperCase()}
            </div>
          )}

          <svg
            className="hidden fill-current sm:block"
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
              fill=""
            />
          </svg>
        </Link>

        {/* <!-- Dropdown Start --> */}
        {dropdownOpen && (
          <div
            className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark`}
          >
            <ul className="flex flex-col gap-5 border-b border-stroke px-3 py-3 dark:border-strokedark">
              <li>
                <p
                  className="flex items-center gap-1 text-sm font-medium duration-300 ease-in-out hover:text-black lg:text-base text-black cursor-pointer"
                  onClick={handleEditClick}
                >
                  <Image width={27} height={27} src={Edit} alt="edit" />
                  Edit Profile
                </p>
              </li>
              <li>
                <div
                  className="flex items-center gap-8 text-sm font-medium duration-300 ease-in-out lg:text-base cursor-pointer"
                  onClick={handleChangePassword}
                >
                  <div className="flex items-center gap-1">
                    <Image width={24} height={25} src={Lock} alt="lock" />
                    Change Password
                  </div>
                  <Image width={30} height={31} src={arrow} alt="arrow" />
                </div>
              </li>
              <li>
                <div className="flex items-center gap-2 text-sm font-medium duration-300 ease-in-out lg:text-base">
                  <div className="flex items-center gap-1">
                    <Image width={24} height={25} src={Bell} alt="bell" />
                    Enable Notifications
                  </div>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value=""
                      className="sr-only peer"
                      checked={isActive}
                      onChange={toggleNotifications}
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-secondary dark:peer-checked:bg-secondary"></div>
                  </label>
                </div>
              </li>
              <li>
                <button
                  className="flex items-center gap-1 text-sm font-medium duration-300 ease-in-out lg:text-base text-secondary"
                  onClick={handleLogoutClick}
                >
                  <Image
                    width={24}
                    height={25}
                    src={LogoutImage}
                    alt="logout"
                  />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
        {/* <!-- Dropdown End --> */}
      </ClickOutside>

      {/* Account logout Modal */}

      <Modal isOpen={isOpen} onClose={onClose} buttonContent="">
        <div className="flex items-center flex-col">
          <Image src={dltCircle} alt="dltCircle" className="" />
          <Text as="h3" className="text-[#000000] font-medium">
            Account Logout
          </Text>
          <Text className="font-medium text-primary text-[21px]">
            Are you sure you want to logout your account??
          </Text>
          <div className="flex gap-10 mt-5 w-full max-w-sm">
            <Button variant="outlined" onClick={() => onClose()}>
              Cancel
            </Button>
            <Button onClick={handleLogout}>Yes, I am</Button>
          </div>
        </div>
      </Modal>

      {/* Change Password Modal */}

      <Modal isOpen={passwordOpen} onClose={onPasswordClose} buttonContent="">
        <div className="flex flex-col gap-4">
          {loading && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000000]">
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
            <div className="mb-2 relative">
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
            <div className="mb-2 relative">
              <Label>New Password</Label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  placeholder="Enter new Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 sm:text-sm text-xs sm:py-3 py-3 mt-1 pr-10 border text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#005B97] rounded-full placeholder:text-sm placeholder:text-xs"
                  required
                  minLength={8}
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
            <div className="mb-14 relative">
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
                  minLength={8}
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

      {/* Edit Profile Modal */}

      <Modal isOpen={isEditOpen} onClose={onEditClose} buttonContent="">
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000000]">
            <ClipLoader color="#007bff" size={50} />
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="flex items-center flex-col gap-10">
            <div className="flex justify-between items-center w-full mb-7">
              <Text
                as="h3"
                className="text-[#000000] font-semibold text-center flex-grow"
              >
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
            <div className="mb-2 w-full">
              <Label> Name</Label>
              <div>
                <input
                  type="text"
                  placeholder="Enter User Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 sm:text-sm text-xs sm:py-3 py-3 mt-1 pr-10 border text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#005B97] rounded-full placeholder:text-sm placeholder:text-xs"
                  required
                />
              </div>
            </div>
            <div className="w-full mt-8">
              <Button type="submit" className="px-16 w-full">
                Continue
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  )
}

export default DropdownUser
