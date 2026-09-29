type Props = {
  index: string;
  label: string;
  title: string;
  lede?: string;
};

export default function SectionHead({ index, label, title, lede }: Props) {
  return (
    <div className="sec__head">
      <p className="sec__index mono" data-anim>
        <span>{index}</span> {label}
      </p>
      <div className="sec__row">
        <h2 className="sec__title" data-split>
          {title}
        </h2>
        {lede && (
          <p className="sec__lede" data-anim>
            {lede}
          </p>
        )}
      </div>
    </div>
  );
}
