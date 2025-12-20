import logger from "../../../utils/logger";

const StyledTd = ({ children }) => {
  return (
    <td className="border-r-[var(--main-secondary-light)] border-r-2 p-[10px]">
      {children}
    </td>
  );
};

const StyledTr = ({ children }) => {
  return (
    <tr className="border-b-[var(--main-secondary-light)] border-b-2">
      {children}
    </tr>
  );
};

const ListProductTable = ({
  name,
  price,
  quantityOrdered,
  createdAt,
  deliveryStatus,
}) => {
  logger.info("Rendering list product entry", createdAt)
  const timeStamp = new Date(createdAt);
  return (
    <>
      <table className="border-collaspe">
        <tbody>
          <StyledTr>
            <StyledTd>Name</StyledTd>
            <StyledTd>{name}</StyledTd>
          </StyledTr>
          <StyledTr>
            <StyledTd>Quantity</StyledTd>
            <StyledTd>{quantityOrdered}</StyledTd>
          </StyledTr>
          <StyledTr>
            <StyledTd>Total Price</StyledTd>
            <StyledTd>{Number(price) * Number(quantityOrdered)}</StyledTd>
          </StyledTr>
          <StyledTr>
            <StyledTd>Date Added</StyledTd>
            <StyledTd>{timeStamp.toLocaleString()}</StyledTd>
          </StyledTr>
          <StyledTr>
            <StyledTd>Delivery Status</StyledTd>
            <StyledTd>{deliveryStatus}</StyledTd>
          </StyledTr>
        </tbody>
      </table>
    </>
  );
};

export default ListProductTable;
