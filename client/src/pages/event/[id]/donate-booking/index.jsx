import MultistepForm from '../../../../components/multistep-form/form'
import MainLayout from '../../../../layouts/main-layout/Default'

export default function DonationBook(props) {
  return (
    <MainLayout>
      <MultistepForm eventId={props.id} />
    </MainLayout>
  )
}
export async function getServerSideProps(ctx) {
  const { id } = ctx.query
  console.log(id)
  return {
    props: {
      id,
    },
  }
}
