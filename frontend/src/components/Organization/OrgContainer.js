import { useSelector } from "react-redux";

import Organization from "./Organization.js";

const OrgContainer = () => {
    const userOrgs = useSelector(state => state.session.user.user_organizations);

    return (
        <div style={{width: '14vw'}}>
            {
                userOrgs.map((org, i) => <Organization orgId={org.organization_id} orgName={org.organization_name} orgOwnerId={org.organization_owner} key={i} />)
            }
        </div>
    );
};

export default OrgContainer;