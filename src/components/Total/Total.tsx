import {FC} from 'react';
import {ITotal} from "../../types";

const Total: FC<ITotal> = ({total}) => {
  return (
      <div>
        <span>Total: {total}</span>
      </div>
  );
};

export default Total