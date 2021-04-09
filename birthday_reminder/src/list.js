import React from 'react'

const List = ({ data }) => {
    return (
        <ul>
            {data.map((d) => {
                const curdate = new Date();
                const dob = Date.parse(d.dob);
                const age = parseInt((curdate - dob) / (86400000 * 365));
                return (
                    <li key={d.id}>
                        <img src="https://lh3.googleusercontent.com/ogw/ADGmqu96yLIRqeW3w7Pd8i_-9ylCEed82I7-ep5HWEbzow=s83-c-mo" alt="profile_image" />
                        <article className='article'>
                            <h4>{d.name}</h4>
                            <p>Age: {age + 1}</p>
                        </article>
                    </li>
                )
            })}
        </ul>
    )
}

export default List;