import { FunctionComponent } from 'react';

import styles from "./styles.module.scss";

interface ButtonProps {
  title: string;
  backgroundColor?: string;
  callback: () => void;
}

const Button: FunctionComponent<ButtonProps> = ({ title, backgroundColor = '#5741d9', callback}) => {
  return (
    <div className={styles.container} style={{ backgroundColor }} onClick={callback}>
      {title}
    </div>
  );
};

export default Button;