import { MasterCenter } from '@/components/molecules/master';
import { ErrorBlock } from '@/components/molecules/error-block';
import { SvgTrash } from '@/components/icons/components/trash';

export default function NotFound() {
  return (
    <MasterCenter>
      <ErrorBlock icon={<SvgTrash />} code="404" name="page not found" />
    </MasterCenter>
  );
}
