import Applications from "../Applications/Applications";
import NewApplication from "../NewApplication/NewApplication";

function PersonalAccount(){
    return(
        <div>
            <NewApplication/>
            <Applications/>
        </div>
    );
}

export default PersonalAccount