import './Body.css';
import {useEffect, useState} from "react";
import {collection, doc, onSnapshot, setDoc} from "@firebase/firestore";
import db from '../firebase';


var tasks_in_progress = [{task: "inProcess"}];
var tasks_completed = [{task: "complited"},{task: "complited2"}];
var tasks_removed = [{task: "removedTask"}];


const Body = ({active, onChange}) => {
    const [list_tasks, SetTasks_in_progress] = useState(tasks_in_progress);
    /*let to change in real time*/
    useEffect(
        () =>
            onSnapshot(collection(db, "Collection"), (snapshot) => {
                let dbData = snapshot.docs.map((doc) => (doc.data()))[0];
                console.log(dbData)
                tasks_in_progress = dbData["in_prog"];
                tasks_completed = dbData["compl"];
                tasks_removed = dbData["rem"];
                handleClick();
            })
        ,
        []
    );
    /*setDoc - Writes to the document referred to by this DocumentReference.
    If the document does not yet exist, it will be created.*/
    const save = async () => {
        const docRef = doc(db, "Collection", "Doc");
        await setDoc(docRef, {
            in_prog: [...tasks_in_progress],
            compl: [...tasks_completed],
            rem: [...tasks_removed]
        });
    }

    const handleTaskCountChange = (count) => {
        onChange(count);
    }


    function addItem() {
        let inpTsk = prompt('What\'s your task', 'New task');
        if (inpTsk != null && inpTsk != "") {
            tasks_in_progress.push({task: inpTsk});
        }
        handleClick();
        save();
    }


    // function change array's status when we add or removed, the
    function handleClick() {
        SetTasks_in_progress(state => {
            return {
                tasks_in_progress
            };
        });
    };



    // Array IN PROGRESS
    if (active == 'To do list') {
        handleTaskCountChange(tasks_in_progress.length);
        return (
            <div className='body'>
                {(tasks_in_progress || []).map((item, index) => (
                    <div className='itemTsk' key={index}>
                        <span onClick={(e) => doneTask(index, e)} className='ElipseIn'/>
                        <span className='taskTitle'>{item.task}</span>
                        <span onClick={(e) => removeTask(index, e)} className='removeItem'><span>&#10006;</span></span>
                    </div>
                ))}
                <input type="button" className='AddBtn' onClick={(e) => addItem()} value='+'/>
            </div>
        );
    }



    else if (active == 'Completed list') {
        handleTaskCountChange(tasks_completed.length);
        return (
            <div className='body'>
                {(tasks_completed || []).map((item, index) => (
                    <div className='itemTskCompl' key={index}>
                        <span onClick={(e) => undoneTask(index, e)} className='ElipseInCompl'>✓</span>
                        <span className='taskTitle'>{item.task}</span>
                    </div>
                ))}
                {}
            </div>
        )
    }


    else if (active == 'Removed list') {
        handleTaskCountChange(tasks_removed.length);
        return (
            <div className='body'>
                {(tasks_removed || []).map((item, index) => (
                    <div className='itemTskCompl' key={index}>
                        <span className='taskTitleDel'>{item.task}</span>
                        <span onClick={(e) => restoreTask(index, e)} className='restoreItem'><span>&#8635;</span></span>
                        <span onClick={(e) => deleteTask(index, e)} className='restoreItem delete'><span>&#10006;</span></span>
                    </div>
                ))}
                {/*  <input type="button" className='AddBtn' onClick={(e) => addItem()} value='✓'/>*/}
            </div>
        )
    }

    //finish task inP -> cmpl
    function doneTask(item) {
        tasks_completed.push({task: tasks_in_progress[item].task});
        tasks_in_progress.splice(item, 1);
        handleClick();
        save();
    }

    // rm <- inP
    function removeTask(item) {
        tasks_removed.push(({task: tasks_in_progress[item].task}));
        tasks_in_progress.splice(item, 1);
        handleClick();
        save();
    }

    // cmpl -> inP
    function undoneTask(item) {
        tasks_in_progress.push({task: tasks_completed[item].task});
        tasks_completed.splice(item, 1);
        handleClick();
        save();
    }

    //rm -> inP
    function restoreTask(item) {
        tasks_in_progress.push({task: tasks_removed[item].task});
        tasks_removed.splice(item, 1);
        handleClick();
        save();
    }
    // rm -> space
    function deleteTask(item) {
        tasks_removed.splice(item, 1);
        handleClick();
        save();
    }
}

export default Body;


