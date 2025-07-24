import { ComponentProps } from 'react';
import { cn } from '@/lib/utils/cn';

type MasterProps = ComponentProps<'div'>;
const MasterDefault = (props: MasterProps) => {
  const { children, className, ..._props } = props;
  const _className = 'flex flex-grow items-start px-4';
  return (
    <section className={cn(_className, className)} {..._props}>
      {children}
    </section>
  );
};
const MasterFullHeight = (props: MasterProps) => {
  const { children, className, ..._props } = props;
  const _className = 'flex flex-grow px-4';
  return (
    <section className={cn(_className, className)} {..._props}>
      {children}
    </section>
  );
};
const MasterCenter = (props: MasterProps) => {
  const { children, className, ..._props } = props;
  const _className = 'flex flex-grow justify-center items-center px-4';
  return (
    <section className={cn(_className, className)} {..._props}>
      <div className="w-[min(320px,100%)] h-fit">{children}</div>
    </section>
  );
};

export { MasterDefault, MasterFullHeight, MasterCenter };
