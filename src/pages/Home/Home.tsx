import React, {useState} from 'react';

type month = {
    _id: string;
    date: string;
    rent: number;
    util: number;
    food: number;
    other: number;
    total: number;
}

export default function Home() {
    const [monthlyBills, setBills] = useState<month[]>([]);
    const [date, setDate] = useState("");
    const [rent, setRent] = useState(0);
    const [util, setUtil] = useState(0);
    const [food, setFood] = useState(0);
    const [other, setOther] = useState(0);

    const submit = async function() {
        const json = {
            date: date,
            rent: rent,
            util: util,
            food: food,
            other: other
        };

        const body = JSON.stringify(json);

        const response = await fetch( "/newEntry", {
            method:"POST",
            body: body,
            headers: {"Content-Type": "application/json"}
        });

        const text = await response.text();
        const newInfo:month = JSON.parse(text);
        monthlyBills.push(newInfo);
    }

    const update = async function(id: string) {
        const json = {
            id: id,
            date: date,
            rent: rent,
            util: util,
            food: food,
            other: other
        };

        const body = JSON.stringify(json);

        const response = await fetch( "/updateEntry", {
            method:"PUT",
            body: body,
            headers: {"Content-Type": "application/json"}
        });

        const text = await response.text();
        const newInfo: month = JSON.parse(text);
        for (let i = 0; i < monthlyBills.length; i++) {
            if (monthlyBills[i]._id === newInfo._id) {
                monthlyBills[i] = newInfo;
            }
        }
    }

    const remove = async function(id: string) {
        const json = {
            id: id
        }

        const body = JSON.stringify(json);

        const response = await fetch( "/deleteEntry", {
            method:"DELETE",
            body: body,
            headers: {"Content-Type": "application/json"}
        });

        const newList: month[] = [];
        for (let i = 0; i < monthlyBills.length; i++) {
            if (monthlyBills[i]._id !== id) {
                newList.push(monthlyBills[i]);
            }
        }
        setBills(newList);
    }

    window.onload = function() {
        fetch( "/check", {
            method:"POST"
        }).then((result) => {
            if (result.status === 200) {
                initialData();
            } else {
                window.location.replace(window.location.origin + "/invalid");
            }
        });
    }

    const initialData = async function() {
        const response = await fetch( "/userInfo", {
            method:"POST"
        });

        if (response.status === 200) {
            const text = await response.text();
            const data: month[] = JSON.parse(text);

            setBills(data);
        }
    }

    const billRender = monthlyBills.map((p) => {
        return (
            <tr id={`${p._id}`}>
                <td>{p.date}</td>
                <td>${p.rent.toFixed(2)}</td>
                <td>${p.util.toFixed(2)}</td>
                <td>${p.food.toFixed(2)}</td>
                <td>${p.other.toFixed(2)}</td>
                <td>${p.total.toFixed(2)}</td>
                <td onClick={() => update(p._id)}>Update</td>
                <td onClick={() => remove(p._id)}>Delete</td>
            </tr>
        );
    });

    const totalRender = () => {
        let rent = 0;
        let util = 0;
        let food = 0;
        let other = 0;
        let total = 0;

        for (let i = 0; i < monthlyBills.length; i++) {
            rent += monthlyBills[i].rent;
            util += monthlyBills[i].util;
            food += monthlyBills[i].food;
            other += monthlyBills[i].other;
            total += monthlyBills[i].total;
        }

        return (
            <tr id="totals">
                <td>Totals:</td>
                <td>${rent.toFixed(2)}</td>
                <td>${util.toFixed(2)}</td>
                <td>${food.toFixed(2)}</td>
                <td>${other.toFixed(2)}</td>
                <td>${total.toFixed(2)}</td>
            </tr>
        );
    }

    return (
        <body>
            <form>
                <label htmlFor="monthYear">Enter Month & Year</label>
                <input type="month" id="monthYear" onChange={(e) => setDate(e.target.value)}/>

                <label htmlFor="rent">Enter Rent</label>
                <input type="number" id="rent" placeholder="$0.00" onChange={(e) => setRent(e.target.valueAsNumber)}/>

                <label htmlFor="util">Enter Utilities</label>
                <input type="number" id="util" placeholder="$0.00" onChange={(e) => setUtil(e.target.valueAsNumber)}/>

                <label htmlFor="food">Enter Food Expenses</label>
                <input type="number" id="food" placeholder="$0.00" onChange={(e) => setUtil(e.target.valueAsNumber)}/>

                <label htmlFor="other">Enter Other Expenses</label>
                <input type="number" id="other" placeholder="$0.00" onChange={(e) => setUtil(e.target.valueAsNumber)}/>
                <button className="submitButton" onClick={submit}>SUBMIT</button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>Month & Year</th>
                        <th>Rent</th>
                        <th>Utilities</th>
                        <th>Food</th>
                        <th>Other</th>
                        <th>Monthly Total</th>
                    </tr>
                </thead>
                {billRender}
                <tfoot>
                    {totalRender()}
                </tfoot>
            </table>
        </body>
    );
}
