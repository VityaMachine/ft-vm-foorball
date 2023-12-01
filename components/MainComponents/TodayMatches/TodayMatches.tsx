'use client'

export default function TodayMatches() {

    const todayDate = new Date()

    console.log(todayDate.toISOString().slice(0, 10));
    console.log(todayDate.getTimezoneOffset());
    
    
    

	return <div>TodayMatches</div>
}
