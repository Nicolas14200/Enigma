import { v4 } from "uuid";

export interface SecuritySchemesProps {
  name: string;
  id: string;
  cesar: {
    shift: number;
    increment: number;
  };
  rotor: string[];
}

export class SecuritySchemes {
  props: SecuritySchemesProps;
  constructor(props: SecuritySchemesProps) {
    this.props = props;
  }
  static create(props: {
    name: string;
    cesar: {
      shift: number;
      increment: number;
    };
    rotor: string[];
  }) {
    return new SecuritySchemes({
      id: v4(),
      name: props.name,
      cesar: {
        shift: props.cesar.shift,
        increment: props.cesar.increment,
      },
      rotor: props.rotor,
    });
  }
}
