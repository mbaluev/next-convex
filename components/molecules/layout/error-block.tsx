import { ComponentProps, forwardRef, ReactElement } from 'react';
import { ButtonBack } from '@/components/auth/button-back';

type ErrorBlockBaseProps = {
  icon?: ReactElement;
  code?: string;
  name?: string;
};
type ErrorBlockProps = ComponentProps<'div'> & ErrorBlockBaseProps;
const ErrorBlock = forwardRef<HTMLDivElement, ErrorBlockProps>((props, ref) => {
  const { icon, code, name, ...rest } = props;
  return (
    <div ref={ref} className="flex flex-col gap-6 items-center w-full py-10" {...rest}>
      {icon && <p className="text-[12rem]">{icon}</p>}
      <div className="flex flex-col gap-3 items-center">
        {code && <p className="text-4xl font-medium">{code}</p>}
        {name && <p>{name}</p>}
        <ButtonBack href="/" label="back home" />
      </div>
    </div>
  );
});
ErrorBlock.displayName = 'ErrorBlock';

export { ErrorBlock };
