import { getShortName } from '../utils/getShortName';

const Avatar = ({ fullName }: { fullName: string }) => {
  return (
    <div className="avatar placeholder">
      <div className="text-neutral-content w-12 rounded-full bg-[#f47624]">
        <span>{getShortName(fullName)}</span>
      </div>
    </div>
  );
};

export default Avatar;
