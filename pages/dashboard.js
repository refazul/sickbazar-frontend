import { Dropdown } from "../components/bonik/dropdown"

const options = [
    { title: "One", value: "1" },
    { title: "Two", value: "2" },
    { title: "Three", value: "3", selected: true },
    { title: "Four", value: "4" },
    { title: "Five", value: "5" },
    { title: "Six", value: "6" },
]

export default function Dashboard() {
    return (
        <div>
            <Dropdown options={options}></Dropdown>
        </div>
    )
}