'use client'
import {Navbar, NavbarBrand, NavbarContent, Link, Button, Input, Dropdown, DropdownTrigger, Avatar, DropdownMenu, DropdownItem} from "@nextui-org/react";
import { IoSearchOutline } from "react-icons/io5";
import { SiGoogledocs } from "react-icons/si";



export default function App() {
  return (
    <div className="">
      <Navbar className="sticky top-0">
      <NavbarContent justify="start" className=" gap-2">
      <SiGoogledocs size={30} className="text-purple-500 " />
      <p className="text-2xl text-inherit p-0">QuantumDocs</p>
      </NavbarContent>
      
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
      <Input
          size="lg"
          radius="full"
          type="Search"
          placeholder="Search"
          fullWidth
          className=" focus:bg-white max-w-[800px] lg:w-[730px] md:w-[400px]"
          startContent={
            <IoSearchOutline color="black" className="text-2xl text-default-400  pointer-events-none flex-shrink-0 animate-pulse" />
          }
        />
      </NavbarContent>
      <NavbarContent as="div" className="items-center" justify="end">
      <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="md"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
    </div>
  );
}