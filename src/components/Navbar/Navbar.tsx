import { useContext } from 'react'
import routeSVG from "../../assets/route.svg"
import { Button, Dropdown, Label, Skeleton, Tabs } from '@heroui/react'
import { authContext } from '../context/AuthContext'
import { useLocation, useNavigate } from 'react-router'
import { userContext } from '../context/UserContext'
import { House, LogOut, Menu, MessageCircle, Settings, User } from 'lucide-react'



export default function Navbar() {

  const { setToken } = useContext(authContext)!
  const { userData } = useContext(userContext)!
  const navigate = useNavigate()
  const location = useLocation()
  const activeTab = location.pathname.split("/")[1] || "feed"

  function logoutUser() {
    localStorage.removeItem("userToken")
    setToken(null)
  }
  return (
    <>
      <nav className='fixed inset-x-0 top-0 z-999 bg-white p-4 shadow-md '>
        <div>

        </div>
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="nav-logo">
            <img src={routeSVG} width={80} alt="" />
          </div>
          <div className="nav-links order-2 min-w-0 flex-1 overflow-x-auto sm:order-2 sm:flex-none">
            <Tabs
              className="mx-auto w-fit min-w-max max-w-md"
              selectedKey={activeTab}
              onSelectionChange={(key) => navigate(`/${key}`)}
            >
              <Tabs.ListContainer>
                <Tabs.List aria-label="Options" className="bg-slate-100 p-1 rounded-2xl">
                  <Tabs.Tab
                    id="feed"
                    className="font-bold hover:text-black data-[selected=true]:bg-white data-[selected=true]:text-blue-600 data-[selected=true]:shadow-sm"
                  >
                    <House size={20} className="sm:mr-1" />
                    <span className="hidden sm:inline">Feed</span>
                    <Tabs.Indicator />
                  </Tabs.Tab>
                  <Tabs.Tab
                    id="profile"
                    className="font-bold hover:text-black data-[selected=true]:bg-white data-[selected=true]:text-blue-600 data-[selected=true]:shadow-sm"
                  >
                    <User size={20} className="sm:mr-1" />
                    <span className="hidden sm:inline">Profile</span>
                    <Tabs.Indicator />
                  </Tabs.Tab>
                  <Tabs.Tab
                    id="notifications"
                    className="font-bold hover:text-black data-[selected=true]:bg-white data-[selected=true]:text-blue-600 data-[selected=true]:shadow-sm"
                  >
                    <MessageCircle size={18} className="sm:mr-1" />
                    <span className="hidden sm:inline">Notifications</span>
                    <Tabs.Indicator />
                  </Tabs.Tab>
                </Tabs.List>
              </Tabs.ListContainer>
            </Tabs>
          </div>
          <div className="nav-actions order-2 sm:order-3">
  <Dropdown>
    {!userData ? (
      <Button
        aria-label="Menu"
        className="bg-[#EBEBEC] px-2 border border-gray-300 py-5"
      >
        <div className="size-8">
          <Skeleton className="h-full w-full rounded-full" />
        </div>

        <Skeleton className="h-4 w-14 rounded-md" />
      </Button>
    ) : (
      <Button
        aria-label="Menu"
        className="bg-[#F0F2F5] px-2 border border-gray-300 py-5"
      >
        <div className="size-8">
          <img
            src={userData?.photo}
            alt="user-profile"
            className="w-full rounded-full"
          />
        </div>

        <span className="capitalize text-black font-normal hidden md:inline">
          {userData?.name}
        </span>

        <Menu className="text-gray-600" />
      </Button>
    )}

    <Dropdown.Popover>
      <Dropdown.Menu
        onAction={(key) => {
          if (key === "profile") navigate("/profile");
          if (key === "settings") navigate("/changePassword");
        }}
      >
        <Dropdown.Item id="profile" textValue="profile">
          <User size={18}/>
          <Label>Profile</Label>
        </Dropdown.Item>

        <Dropdown.Item id="settings" textValue="Settings" >
          <Settings size={18}/>
          <Label>Settings</Label>
        </Dropdown.Item>

        <Dropdown.Item
          onClick={logoutUser}
          id="logout"
          textValue="logout"
          variant="danger"
      
        >
          <Label className='mb-1 flex gap-3'>
            <LogOut size={18}/>
            Logout
            </Label>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown.Popover>
  </Dropdown>
</div>
        </div>
      </nav>
    </>
  )
}
