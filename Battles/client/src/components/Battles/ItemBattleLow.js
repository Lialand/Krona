import React from "react";
 
export default function ItemBattleLow(props) {

     return (
        <div className="users">
            {
                props.users.map((item) => 
                    <img 
                        src={"/"+item.avatar} 
                        className="thumbnail"
                        key={item.id} 
                    />
                )
            }
            <div className="usersCountBlock">
                <img src="/assets/images/man.svg" className="manpic" />
                <div className="usersCount">
                    {props.usersCount}
                </div>
            </div>
        </div>
     );
}
 