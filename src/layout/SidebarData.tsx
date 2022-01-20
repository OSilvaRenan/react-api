import * as AiIcons from 'react-icons/ai';

export const SidebarData = [
    {
    title:'Inicio',
    path:"/",
    icon:<AiIcons.AiFillHome/>,
    },
    {
    title:'Autor',
    path:"/autor/list",
    icon:<AiIcons.AiOutlineUser />,
    },
    {
    title:'Editora',
    path:"/editora/list",
    icon:<AiIcons.AiFillBook />,
    }
]

export default SidebarData;