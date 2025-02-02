'use client'
import { logout } from "@/app/slices/authSlice";
import {Navbar, NavbarContent, Input, Dropdown, DropdownTrigger, Avatar, DropdownMenu, DropdownItem} from "@heroui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { SiGoogledocs } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import useAxiosSecure from "@/app/hooks/useAxiosSecure";



export default function NavBar() {
  
  const dispatch = useDispatch();
  const {user: userFromdb} = useSelector(state => state.auth)
  const [user, setUser] = useState({})
  const axiosSecure = useAxiosSecure();
  console.log(userFromdb)
  
  useEffect(() => {
    const fetchUser = async () => {
      try{
        const result = await axiosSecure.get(`/api/users/${userFromdb?.uid}`);
        setUser(result?.data?.user);
      }catch(error) {
        if(error.status != 401) {
          toast.error("Something went wrong");
        }
      }
    } 
    fetchUser();
  }, [userFromdb])




  const handleLogout = async () => {
    try{
      await dispatch(logout()).unwrap();
    } catch(error) {
      toast.error("Something went wrong")
    } 
  }



  return (
    <div>
      <Navbar className="light text-black bg-white">
      <NavbarContent justify="start" className=" gap-2">
      <SiGoogledocs size={30} className="text-purple-500 " />
      <p className="text-2xl text-inherit p-0">QuantumsDocs</p>
      </NavbarContent>
      
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
      <Input
          size="lg"
          radius="full"
          type="Search"
          placeholder="Search"
          fullWidth
          className=" focus:bg-white max-w-[800px] lg:w-[720px] md:w-[400px]"
          startContent={
            <IoSearchOutline color="black" className="text-2xl text-default-400  pointer-events-none flex-shrink-0 animate-pulse" />
          }
        />
      </NavbarContent>
      <NavbarContent className="items-center" justify="end">
      <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name={user?.name}
              size="md"
              src={user.profilePicture || '/images/profilePicture.jpg'}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2 text-black">
              <p className="font-semibold ">Signed in as</p>
              <p className="font-semibold">{user?.email}</p>
            </DropdownItem>
            <DropdownItem className="w-full py-0"><Link href="/signin" className="block py-2 text-black  w-full">My Settings</Link></DropdownItem>
            <DropdownItem onClick={handleLogout} className="text-black" key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
    </div>
  );
}