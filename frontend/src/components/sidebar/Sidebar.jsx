import Conversations from "./Conversations"
import EditButton from "./EditButton"
import LogoutButton from "./LogoutButton"
import SearchInput from "./SearchInput"

const Sidebar = () => {
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
      <SearchInput />
      <div className="divider px-3"></div>
      <Conversations />
      <div className="flex w-full justify-between  mt-auto">
        <LogoutButton />
        <EditButton />
      </div>
    </div>
  )
}

export default Sidebar
