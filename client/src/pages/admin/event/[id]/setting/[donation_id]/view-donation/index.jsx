import AllStepForm from '../../../../../../../components/multistep-form/allstep'
import MiniDrawer from '../../../../../../../layouts/trial/MiniDrawer'
import router from 'next/router'

function viewDonation({ eventId, donationId }) {
    return (
        <MiniDrawer>
            <AllStepForm eventId={eventId} donationId={donationId}/>
        </MiniDrawer>
    )
}
viewDonation.getInitialProps = async (ctx) => {
    return {
        eventId: ctx.query.id,
        donationId: ctx.query.donation_id
    }
}

export default viewDonation