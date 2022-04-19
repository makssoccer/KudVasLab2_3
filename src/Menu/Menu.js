import './Menu.css';
import {useState} from "react";


const Menu=({onClick}) =>
{

    const [list_name, setList_name]=useState('To do list');
    const handleTitleChange = (tit)=>{
        onClick(tit);
    }

    function ChoiceItem() {
        let menuElem = document.getElementById('nav');
        let titleElem = menuElem.querySelector('.title');

        menuElem.onclick = function () {
            menuElem.classList.toggle('open');
        };
    }


    function ChoiceTitle(title)
    {
        setList_name(title);
        handleTitleChange(title); //Send our choose to parents component, after parent (App) send to Body
    }

        return (
            <div>
                <div className='wrapper'>
                    <p>{list_name}</p>
                    <div id='nav' className='menu' onClick={(e) => ChoiceItem(e)}>
                       {}
                       { <ul>
                            <li className='line' onClick={(e) => ChoiceTitle('Completed list')}>Completed</li>
                            <li className='line' onClick={(e) => ChoiceTitle('To do list')}>In progress</li>
                            <li onClick={(e) => ChoiceTitle('Removed list')}>Removed</li>
                        </ul>}
                    </div>
                </div>
            </div>
        );

}

export default Menu;