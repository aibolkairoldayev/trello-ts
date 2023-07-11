import { ChangeEvent, useState } from "react"

type editableSpanPropsType ={
    title: string
    onChange: (newTitle:string) => void
}
export function EditableSpan (props:editableSpanPropsType) {
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState('')

    const activateEditMode = ()=> {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = ()=> {
        setEditMode(false)  
        props.onChange(title)      
    }
    const onChangeTitleHandler = (e:ChangeEvent<HTMLInputElement>)=> {
        setTitle(e.currentTarget.value)
    }
    
    return (
        editMode ? 
        <input type="text" value={title} onBlur={activateViewMode} autoFocus onChange={onChangeTitleHandler}/> 
        : 
        <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
}