import { Storage } from '@ionic/storage';
import { useEffect, useState } from 'react';
import { Row, getSeedRows } from '../data/seedRows';
import {
  IonContent,
  IonButton,
  IonCard,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonListHeader,
  IonPage,
  IonReorder,
  IonReorderGroup,
  IonTitle,
  IonToggle,
  IonToolbar,
  ItemReorderEventDetail,
  useIonViewWillEnter,
  IonModal,
  IonInput,
  IonFab,
  IonFabButton,
  IonFabList,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonCardSubtitle,
  IonTextarea,
  IonImg
} from '@ionic/react';
import './Home.css';
import { add, addCircleOutline, arrowBackCircleOutline, arrowForwardCircleOutline, closeOutline, playOutline, removeCircleOutline } from 'ionicons/icons';

/* Qs:
  - will a note ever be a part of multiple groups?
    - not necessary, 
  - need a dark and light mode?
    - toggle
  - how's the font size on notes? need it editable?
    X editable
  - once you note is added, how often do you edit? 
    - how do you edit? in the app, edit the file and reupload?
    - both? but through the app will be good
  - what device are you mainly using it on?
    - phone or fire tablet
  - local storage, upload from comp to drive, dl to phone in folder - create a folder in docs
    - can it be connected to google drive? just a static folder via link
  - new notes
    - append to bottom in its own, misc/ungrouped section
*/

/* Todo:
  X whitespace in notes
  X editing
  - note upload
  X save locally
  - delete row
*/ 
const Home: React.FC = () => {
  // storage
  const STORAGE_KEY = 'setlist-rows';
  const [storage, setStorage] = useState<Storage>();

  // core rows
  const [rows, setRows] = useState<Row[] | undefined>(undefined);
  const [reorderEnabled, setReorderEnabled] = useState<boolean>(false);

  // editing group
  const [editGroup, setEditGroup] = useState<Row | undefined>(undefined);
  const [showEditGroup, setShowEditGroup] = useState<boolean>(false);
  // creating group
  const [showNewGroup, setShowNewGroup] = useState<boolean>(false);
  const [newGroupName, setNewGroupName] = useState<string | undefined>(undefined);
  const [groupError, setGroupError] = useState<string | undefined>(undefined);

  // editing note
  const [editNote, setEditNote] = useState<Row | undefined>(undefined);
  const [showEditNote, setShowEditNote] = useState<boolean>(false);
  // creating note
  const [showNewNote, setShowNewNote] = useState<boolean>(false);
  const [newNoteName, setNewNoteName] = useState<string | undefined>(undefined);
  const [newNoteText, setNewNoteText] = useState<string | undefined>(undefined);
  const [noteError, setNoteError] = useState<string | undefined>(undefined);

  // setlist active
  const [activeNotes, setActiveNotes] = useState<Row[] | undefined>(undefined);
  const [activeIndex, setActiveIndex] = useState<number>(1);

  // settings
  const [fontSize, setFontSize] = useState<number>(16);
  const MIN_FONT = 12;
  const MAX_FONT = 36;

  useIonViewWillEnter(async () => {
    // const seed = getSeedRows();
    const store = new Storage();
    await store.create();
    setStorage(store);
    const rows = await store.get(STORAGE_KEY)
    setRows(rows)
  });

  useEffect(() => {
    if (editNote) setShowEditNote(true)
    else setShowEditNote(false)
  }, [editNote])
  
  useEffect(() => {
    if (editGroup) setShowEditGroup(true)
    else setShowEditGroup(false)
  }, [editGroup])

  useEffect(() => {
    //nothing, maybe to help with delete?
  }, [rows])
  
  const createGroup = async () => {
    setGroupError(undefined);
    if (newGroupName) {
      if (rows) {
        rows.push({ isGroupHeader: true, name: newGroupName, text: null })
        setRows(rows);
      } else {
        let r = [{ isGroupHeader: true, name: newGroupName, text: null }]
        setRows(r);
      }
      saveDetails();
      setShowNewGroup(false);
    } else {
      setGroupError('Group name is required.')
    }
  }

  const createNote = async () => {
    setNoteError(undefined);
    if (newNoteName) {
      if (newNoteText) {
        console.log('new note:',newNoteText)
        if (rows) {
          rows.push({ isGroupHeader: false, name: newNoteName, text: newNoteText })
          setRows(rows);
        } else {
          let r = [{ isGroupHeader: false, name: newNoteName, text: newNoteText }]
          setRows(r);
        }
        saveDetails();
        setShowNewNote(false);
      } else setNoteError('Note contents is required.')
    } else setNoteError('Note name is required.')
  }

  const editNoteName = async (newName: string) => {
    let t = editNote;
    t!.name = newName;
    setEditNote(t)
  }

  const editEditNoteText = async (newText: string) => {
    let t = editNote;
    t!.text = newText;
    setEditNote(t)
  }

  const editGroupName = async (newName: string) => {
    let t = editGroup;
    t!.name = newName;
    setEditGroup(t)
  }

  const deleteRow = async (rowName: string) => {
    console.log('before delete:',rows)
    let i = rows?.findIndex(r => r.name === rowName)

    let node = document.getElementById(rowName);
    if (node?.parentNode) {
      node.parentNode.removeChild(node);
    }

    if (i && i >= 0) {
      rows?.splice(i, 1)
      setRows(rows)
      console.log('after delete:',rows)
      saveDetails();
    }
  }

  const saveDetails = async () => {
    // save locally
    if (storage) storage.set(STORAGE_KEY, rows)

    // reset everything
    setEditGroup(undefined)
    setEditNote(undefined)
    setShowEditGroup(false)
    setShowEditNote(false)
    setShowNewGroup(false)
    setShowNewNote(false)
  }
  
  function doReorder(event: CustomEvent<ItemReorderEventDetail>) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', event.detail.from, 'to', event.detail.to);
    // Reorder the actual row data model
    if (rows) {
      let r = rows.splice(event.detail.from, 1)[0];
      rows.splice(event.detail.to, 0, r);
    }
    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    event.detail.complete();
    saveDetails();
  }

  function launchSetlist(row: Row) {
    if (!rows) return;
    // get index of this row and next header
    let groupHeader = rows.findIndex(r => r.name === row.name);  // todo: if two rows have the same name, only returns the first
    let nextHeader = rows.findIndex((r, i) => i > groupHeader && r.isGroupHeader);
    if (nextHeader === -1) nextHeader = rows.length;
    // find all notes in this group
    let notes = rows.slice(groupHeader, nextHeader);
    // load the play session with this list
    console.log(notes)
    setActiveIndex(1);
    setActiveNotes(notes);
  }

  function increaseFont() {
    let f = fontSize;
    if (fontSize < MAX_FONT) f++;
    setFontSize(f);
  }

  function decreaseFont() {
    let f = fontSize;
    if (fontSize > MIN_FONT) f--;
    setFontSize(f);
  }

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <div className='header-left'>
            <IonTitle className="title">
              <div className='title-content'>
                <IonImg className='logo-icon' src='assets/icon-logo.png'></IonImg>
                Setlist
              </div>
            </IonTitle>
            <div className='reorder-toggle'>
              Edit
              <IonToggle checked={reorderEnabled} onIonChange={e => setReorderEnabled(e.detail.checked)}></IonToggle>
            </div>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              <img src='/assets/icon-logo.png'></img>
              Setlist
            </IonTitle>
            <div className='reorder-toggle'>
              Edit
              <IonToggle checked={reorderEnabled} onIonChange={e => setReorderEnabled(e.detail.checked)}></IonToggle>
            </div>
          </IonToolbar>
        </IonHeader>

        {/* Rows of both headers and notes */}
        <IonReorderGroup disabled={!reorderEnabled} onIonItemReorder={doReorder}>
          {rows && rows.map(g => 
            (<div key={g.name}>
              { g.isGroupHeader ? 
                <IonListHeader className="group-header" id={g.name}>
                  <IonLabel className="ion-text-wrap">{g.name}</IonLabel>
                  { !reorderEnabled && <IonButton className="play-button" onClick={() => launchSetlist(g)}><IonIcon icon={playOutline}></IonIcon></IonButton> }
                  { reorderEnabled &&
                    <IonButton onClick={() => setEditGroup(g)}>Edit</IonButton>
                  }
                </IonListHeader> : 
                <IonItem id={g.name} onClick={() => setEditNote(g)}>
                  <IonLabel className="ion-text-wrap">
                    <h2>{g.name}</h2>
                  </IonLabel>
                  <IonReorder slot="start" />
                  { reorderEnabled &&
                    <IonButton onClick={() => setEditNote(g)}>Edit</IonButton>
                  }
                </IonItem>
              }
              </div>
            )
          )}
        </IonReorderGroup>

        {/* App settings */}
        { reorderEnabled &&
          <div className='app-settings'>
            <h4 className="settings-header">App Settings</h4>
            <div className="setting-option">
              <h6>Font size</h6>
              <div className='font-size'>
                <IonButton className='font-button' onClick={() => decreaseFont()} disabled={fontSize <= MIN_FONT}><IonIcon icon={removeCircleOutline}></IonIcon></IonButton>
                <IonLabel>{fontSize}px</IonLabel>
                <IonButton className='font-button' onClick={() => increaseFont()} disabled={fontSize >= MAX_FONT}><IonIcon icon={addCircleOutline}></IonIcon></IonButton>
              </div>
            </div>
          </div>
        }

        {/* Editing note modal */}
        { editNote &&
        <IonModal isOpen={showEditNote} onDidDismiss={() => setShowEditNote(false)}>
          <IonInput placeholder='Note Name' value={editNote.name} onIonChange={(e) => editNoteName(e.target.value!.toString())}></IonInput>
          <IonTextarea placeholder="Note content" rows={10} value={editNote.text} onIonChange={e => editEditNoteText(e.detail.value!)}></IonTextarea>
          { noteError && <IonLabel color="danger">{noteError}</IonLabel> }
          <IonButton onClick={() => saveDetails()}>Save</IonButton>
          <IonButton onClick={() => deleteRow(editNote.name)} color="danger">Delete</IonButton>
        </IonModal>
        }

        {/* Edit group modal */}
        { editGroup &&
          <IonModal isOpen={showEditGroup} onDidDismiss={() => setShowEditGroup(false)}>
            <IonInput placeholder='Edit Group Name' value={editGroup.name} onIonChange={(e) => editGroupName(e.target.value!.toString())}></IonInput>
            { groupError && <IonLabel color="danger">Group name required</IonLabel> }
            <IonButton onClick={() => saveDetails()}>Save</IonButton>
            <IonButton onClick={() => deleteRow(editGroup.name)} color="danger">Delete</IonButton>
          </IonModal>
        }

        {/* Create group modal */}
        <IonModal isOpen={showNewGroup} onDidDismiss={() => setShowNewGroup(false)}>
          <IonInput placeholder='New Group Name' onIonChange={(e) => setNewGroupName(e.target.value?.toString())}></IonInput>
          { groupError && <IonLabel color="danger">Group name required</IonLabel> }
          <IonButton onClick={() => createGroup()}>Create group</IonButton>
          <IonButton onClick={() => setShowNewGroup(false)} color="danger">Cancel</IonButton>
        </IonModal>

        {/* Create note modal */}
        <IonModal isOpen={showNewNote} onDidDismiss={() => setShowNewNote(false)}>
          <IonInput placeholder='New Note Name' onIonChange={(e) => setNewNoteName(e.target.value?.toString())}></IonInput>
          <IonTextarea placeholder="Note content" rows={10} value={newNoteText} onIonChange={e => setNewNoteText(e.detail.value!)}></IonTextarea>
          { noteError && <IonLabel color="danger">{noteError}</IonLabel> }
          <IonButton onClick={() => createNote()}>Create note</IonButton>
          <IonButton onClick={() => setShowNewNote(false)} color="danger">Cancel</IonButton>
        </IonModal>

        {/* Add group or note menu */}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton>
            <IonIcon icon={add} />
          </IonFabButton>
          <IonFabList side="top">
            <IonFabButton onClick={() => setShowNewGroup(true)}>Group</IonFabButton>
            <IonFabButton onClick={() => setShowNewNote(true)}>Note</IonFabButton>
          </IonFabList>
        </IonFab>
      </IonContent>

      {/* Setlist UI */}
      { activeNotes && 
        <div className="active-setlist">
          <IonCard>
            <IonCardHeader>
              <IonCardSubtitle>
                <>Playing: {activeNotes[0].name}</>
                <IonButton onClick={() => setActiveNotes(undefined)}>
                  <IonIcon icon={closeOutline}></IonIcon>
                </IonButton>
              </IonCardSubtitle>
              <IonCardTitle>{activeNotes[activeIndex].name}</IonCardTitle>
            </IonCardHeader>

            <IonCardContent className="note-content">
              <pre className='wrap-text' style={{fontSize:`${fontSize}px`}}>{activeNotes[activeIndex].text}</pre>
              <div className='setlist-nav-buttons'>
                <IonButton className={activeIndex > 1 ? '' : 'hidden'} onClick={() => setActiveIndex(activeIndex-1)}>
                  <IonIcon icon={arrowBackCircleOutline}></IonIcon>
                </IonButton>
                <IonButton className={activeIndex < activeNotes.length-1 ? '' : 'hidden'} onClick={() => setActiveIndex(activeIndex+1)}>
                  <IonIcon icon={arrowForwardCircleOutline}></IonIcon>
                </IonButton>
              </div>
            </IonCardContent>
          </IonCard>
        </div>
      }
    </IonPage>
  );
};

export default Home;
