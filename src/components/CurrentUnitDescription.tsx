type CurrentUnitDescriptionProps =
{
    title: string;
    value: number;
    unit: string;
    srDescription: string;
};


export default function CurrentUnitDescription(
    props: CurrentUnitDescriptionProps
)
{
    const { title, value, unit, srDescription } = props;
    
    return(
        <div className="unit-description-container">
            <dt>{title}</dt>
            <dd aria-hidden="true">{value}{unit}</dd>
            <dd className="visually-hidden">{srDescription}</dd>
        </div>
    );
}
