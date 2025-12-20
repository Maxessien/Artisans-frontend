import { FaCheck } from "react-icons/fa";
import ButtonLink from './../../src/components/reusable_components/ButtonLink';

const VerifiedPage = () => {
  return (
    <>
    <section className="flex flex-col gap-4 justify-center items-center">
      <div className="flex items-center justify-center text-2xl font-medium text-[var(--main-primary)] p-4 rounded-full border-2 border-[var(--main-primary)]">
        <FaCheck />
      </div>

      <div>
        <h1 className="text-center text-[var(--text-primary)] font-medium text-2xl mb-3">Account Verification Successful</h1>
        <p className="text-center text-[var(--main-secondary)] font-medium text-lg">Your account has been verified successfully</p>
      </div>

      <ButtonLink href="/login" width="full" className="py-3">Go to Login</ButtonLink>
    </section>
    </>
  )
}

export default VerifiedPage