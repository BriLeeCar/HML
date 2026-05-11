interface Choice {
    text: string
    next: 'intro' | 'bar'
}

interface Branch {
    body?: string
    redirect?: ReactNode
    choices?: Array<Choice>
}

interface Triage {
    intro: Branch
}

const triagePages = <Triage> {
    intro: {
        body: `
Help Me Leave helps people understand publicly-available information about migration and visas. We are not a licensed immigration advisory service, and nothing we provide is legal advice. 

You must make your own decision based on your circumstances, your preferences and the compromises you are willing to make. We do not advise, direct or encourage anyone to leave their home country. You choose whether to stay or to leave, which country to apply to, and when to act.

The Help Me Leave Support team is run by volunteers and has limited capacity. We focus on supporting the people who are at the **highest risk of harm right now** by helping them understand their options. This includes people who are: 
- Latino/Hispanic communities and Indigenous/Native Americans
- Brown, Black and undocumented immigrants 
- Black Americans
- Transgender people, intersex people and visibly queer or gender non-conforming people
- Disabled people

Please remember that we provide information and support, but we cannot guarantee that there will be a pathway that suits you. 

If you are not in one of these groups, your Support ticket response time will likely be delayed. You are still welcome to:

- Use the Help Me Leave website to find pathways [HelpmeleaveHML | Pathway Explorer](https://www.helpmeleave.us/explorer) 
- Use Help Me Leave resources and guides [HelpmeleaveHML | Guides & Resources](https://www.helpmeleave.us/guides-resources)
- Join our community Discord to support your research. [DiscordJoin the Help Me Leave - Community Discord Server!](https://discord.gg/yt68AYNdt8) 
        
Do you understand how Help Me Leave can help you?
        `,
        choices: [
            {
                text: 'Yes',
                next: 'intro'
            },
            {
                text: 'No',
                next: 'intro'
            },
        ]
    }
}