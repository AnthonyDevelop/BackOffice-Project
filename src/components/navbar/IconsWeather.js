const IconsWeather = (icon) => {

    console.log(icon)
    switch (icon) {
        case 0||1||2||3:
            icon='https://res.cloudinary.com/grupo-delsud/image/upload/v1669730628/eleditorNoticias/clear-day_fjksoq.svg'
            break;    
        case 51||53||55:
            icon='https://res.cloudinary.com/grupo-delsud/image/upload/v1669730857/eleditorNoticias/drizzle_hkmie2.svg'
            break;
        case 56||57||61||63||65:
            icon='https://res.cloudinary.com/grupo-delsud/image/upload/v1669730873/eleditorNoticias/rain_jav6o5.svg'
            break;
        case 71||73||75||77 :
            icon='https://res.cloudinary.com/grupo-delsud/image/upload/v1669730887/eleditorNoticias/snow_grky7u.svg'
            break;                        
        case 80||81||82||85||86||95||96|99:
            icon='https://res.cloudinary.com/grupo-delsud/image/upload/v1669730842/eleditorNoticias/thunderstorms-rain_oyzgbf.svg'
            break;
        case 4:
            icon='https://res.cloudinary.com/grupo-delsud/image/upload/v1669730914/eleditorNoticias/fog_us78fk.svg'
            break;  
        case 45||48:
            icon='https://res.cloudinary.com/grupo-delsud/image/upload/v1669730914/eleditorNoticias/fog_us78fk.svg'
            break;         
        default:
            icon='https://res.cloudinary.com/grupo-delsud/image/upload/v1669730628/eleditorNoticias/clear-day_fjksoq.svg'
    }
  return icon
}

export default IconsWeather