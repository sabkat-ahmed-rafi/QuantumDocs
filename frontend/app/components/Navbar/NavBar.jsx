'use client'
import { logout } from "@/app/slices/authSlice";
import {Navbar, NavbarContent, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@heroui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { SiGoogledocs } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import useAxiosSecure from "@/app/hooks/useAxiosSecure";
import DocumentSearch from "../UI/DocumentSearch";
import getAvatarUrl from "@/app/utils/getAvatarUrl";



export default function NavBar() {
  
  const dispatch = useDispatch();
  const {user: userFromdb} = useSelector(state => state.auth)
  const [user, setUser] = useState({})
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  console.log(user)
  
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
          className=" focus:bg-white max-w-[800px] lg:w-[700px] md:w-[400px]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          startContent={
            <IoSearchOutline color="black" className="text-2xl text-default-400  pointer-events-none flex-shrink-0 animate-pulse" />
          }
        />
        <DocumentSearch userFromdb={userFromdb} search={search} />
      </NavbarContent>
      <NavbarContent className="items-center" justify="end">
      <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <div className="w-[45px] lg:w-[50px] h-[45px] lg:h-[50px] rounded-full border-2 border-purple-700">
            {
              Object.keys(user).length === 0 ?
              <div
              className="w-full h-full rounded-full border-2 bg-purple-600 border-black p-[1px] opacity-0 animate-fade-in"></div>
              :
              <img
              className={`rounded-full border-2 border-black p-[1px] w-full h-full object-cover transition-opacity duration-700 `}
                src={user?.profilePicture == "" ? getAvatarUrl(user?.name) : user?.profilePicture}
              />
            }
            </div>
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2 text-black">
              <p className="font-semibold ">Signed in as</p>
              <p className="font-semibold">{user?.email}</p>
            </DropdownItem>
            <DropdownItem className="w-full py-0"><Link href="/signin" className="block py-2 text-black  w-full">My Settings</Link></DropdownItem>
            <DropdownItem onPress={handleLogout} className="text-black" key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
    </div>
  );
}