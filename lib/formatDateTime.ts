const DATE_TIME_FORMATTER = new Intl.DateTimeFormat(undefined , {
    dateStyle:'medium',
    timeStyle:'short',
})
export default function formatDateTime(dateTime : Date){
    return DATE_TIME_FORMATTER.format(new Date(dateTime))
}