import {NavigationMenu, NavigationMenuList, 
        NavigationMenuItem, NavigationMenuLink} from '@/components/ui/navigation-menu'
import {CommandDialog, CommandInput, CommandList, 
        CommandEmpty, CommandGroup, CommandItem} from '@/components/ui/command'
import { Switch } from '@/components/ui/switch'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Command } from '@/components/ui/command'

function Navbar(){
    const [isDark, setIsDark] = useState(
        localStorage.getItem('theme') === 'true'
    )
    const [isOpen, setOpen] = useState(false)

    function onCheckedChange(value){

        setIsDark(value) 

        if (value) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark')
        }

        localStorage.setItem('theme', value)
        
    }

    useEffect(()=>{
        const saveTheme =localStorage.getItem('theme')
        if (saveTheme == 'true') {
            setIsDark(true)
            document.documentElement.classList.add('dark');
        }
        },[])


    return(
        <>

        <nav className="sticky top-0 backdrop-blur-sm border-b flex
        justify-between items-center px-6 py-3">
        <h1 className='text-blue-500 font-bold text-xl'>⛅Weather App</h1>
        
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <Link to="/">Home</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>

        <Button onClick={()=> setOpen(true)}>
        ⋱⋱ Cari kota
        </Button>

        <Switch onCheckedChange={onCheckedChange} checked={isDark}/>

        </nav>

        <CommandDialog open={isOpen} onOpenChange={setOpen}>
            <Command>
                    <CommandInput />
                <CommandList>
                    <CommandEmpty>Tidak ditemukan di pencarian.</CommandEmpty>
                        <CommandGroup>
                            <CommandItem>Jakarta</CommandItem>
                            <CommandItem>Palembang</CommandItem>
                        </CommandGroup>
                </CommandList>
            </Command>
        </CommandDialog>


    </>
    )
}
export default Navbar