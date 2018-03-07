# Thoughts on Broadway Roles

## Problem scenario

In line 20 of our [release planning document](https://docs.google.com/spreadsheets/d/1rAFsO8K3X3V-sSN5SE79ElZ_feOiG_QwnJvOTVeg6xM/edit?usp=sharing), there's a punch list item "roles collapse" that suggests eliminating the correspondent role, because (conversation, not captured in the doc) there is no easy way to let the bibls in the left sidebar display the correspondent icon.

I started work on this issue by exploring the difficulty of the original request- let bibls for correspondents get the correspondent icon, why not ? For these components, the application relies on intermediate data derived from the TEI via XSLT. Probably because of a similar discussion way back (or Cara's good judgement), that data uses only 'mentionod' and 'contributor' in describing `personPiece*` information; 'personPiece' being a naming convention for app components and data members dealing with information about an author's relationship to a piece.

I knew I could achieve a work-around, but in planning the logic to required come up with the single correct icon for a given author-piece combination, I realized two things:

1. the logic was getting too complex too quickly for such a small UI thing
2. the questions this workaround was prompting pointed to a problem with the model

## Resolution proposal

I believe that the set of four roles currently in use is only appropriate in describing an author's relationship with 'the journal'. Only two of those roles describe an author's relationship with a piece. We present information about both of those relationships in the same UI using some of the same terms. Our model, or our shared understanding of it should be adjusted to accommodate both relationships appropriately.

## Why I've gone to all this trouble
This work item highlights the importance of getting requirements right at any stage in the development lifecycle.

- poorly-founded requirement: this is a critical release-blocker that doesn't make sense
  - working-around the data model to make the display 'consistent' adds code complexity, harder to maintain (below)
  - removing the 'correspondent' role from the dataset is an amputation to cure a hangnail; that is, we are willing to cheapen our dataset to solve a question of presentation
- unmaintainable: implementing a workaround that doesn't address the problem in the underlying data model:
  - causes the app and the data to diverge
  - hides data model features in the app logic
  - is confusing for the folks working on the data, and for the developers who will maintain the app

The immediate effect of this argument *should be* to do almost zero work on this line item, compared to either work-around.

## Sets

The current set *AJ* of roles `[ editor, correspondent, contributor, mentioned ]` describes well the different ways in which an author relates to the journal, but it is a composition of heterogeneous subsets.

- set *AJ'* `[ editor, correspondent ]` is derived from the text ("letter from...", or "Editor: C.F. Briggs") and describes the author's relationship with the journal; possible additions to this subset is *AJ''* : `[ printer, publisher ]`
- set *AP* `[ contributor, mentioned ]` describes the relationship between author and piece. In the scope of this project, the author's relationship with any given piece can only be one of three possibilities (set *AP'*): `[ unrelated (no relationship), mentioned in, author of ]`

The journal is composed of pieces, and the relationships *AP'* are transitive to the journal- the contributor of a piece (the "author of") is a contributor to the journal. But it doesn't work the other way around- Not all of *AJ* applies to author-piece relationships: 'Correspondent' implies 'contributor' but in itself does not describe the author-piece relationship.

## Context and ambiguity

Currently, we use the members of *AP* to describe the overall role of an author and also to describe the relationship of an author to a related piece. These contexts could be called 'Journal' and 'Piece'.

In the author's page, we present information in both contexts for a given author. Because the terminology in *AP* is the same for both contexts, it's likely that a user would be confused only some of the members of *AJ* are reflected in the sidebar (piece context).

## Fin

Use *AP'* to describe author-piece relationships. Work it into the data model and then use it intuitively in the app logic. Most importantly, let it be part of our thinking about this small aspect of the project.
