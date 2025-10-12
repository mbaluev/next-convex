import { MasterCenter } from '@/components/molecules/master';
import { SvgTrash } from '@/components/svg/components/trash';
import { ErrorBlock } from '@/components/molecules/error-block';

export default function NotFound() {
  return (
    <MasterCenter>
      <ErrorBlock icon={<SvgTrash />} code="404" name="page not found" />
    </MasterCenter>
  );
}
