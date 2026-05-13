import {NavigationMenu, NavigationMenuList, 
        NavigationMenuItem, NavigationMenuLink} from '@/components/ui/navigation-menu'
import { Switch } from '@/components/ui/switch'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function Navbar(){
    const [isDark, setIsDark] = useState(false)

    function onCheckedChange(value){

        setIsDark(value) 

        if (value) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark')
        }

    }

    return(
        <nav className="sticky top-0 backdrop-blur-sm border-b flex
        justify-between items-center px-6 py-3">
        <h1 className='text-blue-500 font-bold text-xl'>⛅Weather App</h1>
        
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuLink>
                        <Link to="/">Home</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>

        <Switch onCheckedChange={onCheckedChange}/>
        </nav>
    )
}
export default Navbar