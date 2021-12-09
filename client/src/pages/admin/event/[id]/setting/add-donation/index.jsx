import MultistepForm from '../../../../../../components/multistep-form/form.jsx'
import MiniDrawer from '../../../../../../layouts/trial/MiniDrawer'

const addDonation = () => {
    return (
        <MiniDrawer>
            <MultistepForm currentUrl='admin'/>
        </MiniDrawer>
    )
}

export default addDonation