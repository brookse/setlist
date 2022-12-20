export interface Row {
  isGroupHeader: boolean;
  name: string;
  text: string | null;
}

const rows: Row[] = [
  {isGroupHeader: true, name: 'Setlist 1', text: null},
  {isGroupHeader: false, name: 'Brown Guitar', text: 
    "Well my brother got a brown guitar for Christmas when he was just a kid. "+'\n'+
    "And he always seemed to have it right there with him no matter what he did. "+'\n'+
    "And when he died I put some twine around the neck and hung it on the basement wall. "+'\n'+
    "Never thinking that what would happen to that guitar is what happens to us all."+'\n'+
    "The hands of time they bide themselves away even redwood forests fall. "+
    "And when it broke it broke into a grin as all the maladies within as one began to call."+
    
    "The sun is ringing in my ears. The birds are singing in my eyes. "+
    "The hands of time are pulling down collect a bouquet of the years. And as they go waltzing by"+
    "then play a song and taste the sound of the world as it spins around"+ 
    "with the moon her helpless child swingin' from her apron strings. "+
    "And I'm sure that I felt the moon smile at the wisdom I had found."+
    
    "My brother's broken brown guitar says it don't matter what you are. "+
    "White winged angel, shooting star. It's by your flesh that you are bound. "+
    "My brother's broken brown guitar said it don't matter what you are. "+
    "White winged angel, shooting star cuz it's all part of the same song "+
    "since the universe was born in a voice both sweet and strong. "+
    "So sing along and taste the sound."+
    
    "The sun is ringing in my ears. The birds are singing in my eyes."+ 
    "The hands of time they bide themselves a way??????? butterflies."+
    "So sing along and taste the sound of that guitar shinin' brown. "+
    "My brother's broken brown guitar. You're so much more than what you are."},
  {isGroupHeader: false, name: 'Norwegian Girl', text: 
    "I've never met one living soul yet with the power to love like our Mothers."+
    "And we'll never forget how the table was set each day "+
    "with enough for all my sisters and brothers."+
    "My Norwegian girl. "+
    "Took a walk through this world and as her story is told she's not like the others."+
    "You can just bet that each day I get a vision of her as a gentle reminder."+
    "She says just do your best. Let God do the rest. "+
    "She keeps her smile straight ahead and her troubles behind her."+
    "Just a Norwegian girl. Who took a stroll through this world "+
    "and as her banner unfurled she spread love all around her. "+
    "And the love that she had for us and our Dad. "+
    "And one thing's for sure we're lucky he found her. "+
    "And if you've ever known her voice on the phone when you're feeling alone "+
    "but she's thinking of you. You get a feeling inside. Swells up like the tide. "+
    "And I can say it with pride Mother I love you."+
    "Just a Norwegian girl that God put in this world "+
    "and wherever she walks you see sunshine and flowers. "+
    "Just a Norwegian girl the Lord put in this world"+ 
    "full of infinite love and near magical powers."+
    "And this song my dear it's from all of us here "+
    "who because you were near now we're sharing. "+
    "All that love you gave out scattered about "+
    "and we wanted to tell you thanks for sharing. "+
    "Thanks so much for caring. Thank you for sharing."},
  {isGroupHeader: true, name: 'Setlist 2', text: null},
  {isGroupHeader: false, name: 'Set Me Free', text: 
    "You take a spirit and give it a cage of flesh blood and bone."+
    "Wrap it up and toss it out it will sink like a stone."+
    "A spirit inside a body longs to be free."+
    "Just like a blind man and his eyes know there are things they don't see."+
    "Leave your friends and family behind and take just one step outside your mind."+

    "It's either Jesus or cocaine. There doesn't seem to be enough room here in the middle."+
    "And that would bother me but I ain't the type no I ain't no one to bother with a riddle."+
    "Give your love to me. Give your love to me. Give your love to me and I will set you free."+

    "It's either Jesus or cocaine. There doesn't seem to be enough room here in the middle."+
    "And that would bother me but I ain't the type no I ain't no one to bother with a riddle."+
    "Give your life to me. Give your life to me. Give your life to me and I will set you free."+

    "It's either Jesus or cocaine. There doesn't seem to be enough room here in the middle."+
    "And that would bother me but I ain't the type no I ain't no one to bother with riddles."+
    "Give your soul to me. Give your soul to me. Give your soul to me and I will see you free."+
    "Yes I will set you free."},
  {isGroupHeader: false, name: 'Tell the Wind', text: 
    "I wandered into Mexico."+
    "Had no other better place to go."+
    "I played guitar and I put on a show "+
    "just as the stars came out to pierce a blue black sky."+
    
    "Purple clouds and a silver moon "+
    "I started out with a lover's tune."+
    "I was alone and then pretty soon "+
    "she came out of the shadows right into my eyes."+
    
    "No one can tell the wind how far and how fast or which direction it should blow."+
    "And don't the cactus love livin' alone where nothing else will ever grow."+
    "I sleep all day in the shade of a mesquite tree until the sun is sinkin' low "+
    "then I get up and follow my marachis down whatever road they go."+
    
    "And by the end of the second song "+
    "an angel's voice she was hummin' along."+
    "She knew I'd leave her and she wouldn't be wrong "+
    "and we made love and added of the sounds of the desert night."+
    
    "And no one tell the wind how far and how fast or which direction it ought to blow."+
    "And don't the cactus seem thrilled to live where nothing else will ever grow."+
    "I like to sleep in the shade of a mesquite tree until the sun is sinkin' low "+
    "and then get up and follow my marachis down whatever road they go."+
    
    "Wandered into Mexico."+
    "There is no other better place to go."+
    "I play guitar and I'll put on a show "+
    "soon as the stars come out to pierce a blue black sky."
  },
];

export const getSeedRows = () => rows;

export const getSeedRow = (name: string) => rows.find(m => m.name === name);
