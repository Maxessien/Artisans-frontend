import { motion } from "framer-motion"

const PayOnDeliveryTerms = () => {
  return (
    <motion.section
          initial={{ scaleY: 0 }}
          animate={{ scaleY: [0.8, 1.05, 1] }}
          transition={{ duration: 0.5, ease: "easeIn" }}
          exit={{scaleY: 0}}
          className="w-full bg-(--text-secondary-light) space-y-2 rounded-md py-3"
        >
          <h2 className="text-lg text-(--text-primary) w-full text-center font-normal">
            Payment on Delivery Terms
          </h2>
          <div className="w-full bg-(--text-primary-light) h-[2px]"></div>
          <ul className="space-y-2 px-2">
            <li className="flex justify-start items-center gap-2">
              <span className="w-2 h-2 bg-(--text-primary-light) rounded-full"></span>{" "}
              <span className="text-base text-(--text-primary-light) font-normal">
                Available for non-custom items only
              </span>
            </li>
            <li className="flex justify-start items-center gap-2">
              <span className="w-2 h-2 bg-(--text-primary-light) rounded-full"></span>{" "}
              <span className="text-base text-(--text-primary-light) font-normal">
                Please inspect item before payment
              </span>
            </li>
            <li className="flex justify-start items-center gap-2">
              <span className="w-2 h-2 bg-(--text-primary-light) rounded-full"></span>{" "}
              <span className="text-base text-(--text-primary-light) font-normal">
                Rejected deliveries may affect future COD access
              </span>
            </li>
            <li className="flex justify-start items-center gap-2">
              <span className="w-2 h-2 bg-(--text-primary-light) rounded-full"></span>{" "}
              <span className="text-base text-(--text-primary-light) font-normal">
                Payment must be made at delivery
              </span>
            </li>
          </ul>
        </motion.section>
  )
}

export default PayOnDeliveryTerms