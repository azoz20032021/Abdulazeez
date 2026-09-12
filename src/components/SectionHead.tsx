type Props = {
  index: string;
  label: string;
  title: string;
};

export default function SectionHead({ index, label, title }: Props) {
  return (
    <div className="sec__head">
      <p className="sec__index mono" data-anim>
        <span>{index}</span> {label}
      </p>
      <h2 className="sec__title" data-anim>
        {title}
      </h2>
    </div>
  );
}
