using BooksApp.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;

namespace BooksApp.Controllers
{
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class BooksController : ApiController
    {
        private BooksEntities db = new BooksEntities();

        // GET: api/Books
        public IHttpActionResult GetBooks()
        {
            return Ok(db.Books);
        }

        // GET: api/Books/5
        [ResponseType(typeof(Book))]
        public IHttpActionResult GetBook(Guid id)
        {
            Book book = db.Books.Find(id);
            if (book == null)
            {
                return NotFound();
            }

            return Ok(book);
        }

        // PUT: api/Books/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutBook(Guid id, Book book)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != book.GUID)
            {
                return BadRequest();
            }

            book.UpdatedAt = DateTime.Now;
            db.Entry(book).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookExists(id))
                {
                    return StatusCode(HttpStatusCode.NotFound);
                }
                else
                {
                    throw;
                }
            }

            return Ok(0);
        }

        // POST: api/Books
        public IHttpActionResult PostBook(Book book)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            book.GUID = Guid.NewGuid();
            book.CreatedAt = DateTime.Now;
            db.Books.Add(book);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (BookExists(book.GUID))
                {
                    return StatusCode(HttpStatusCode.Conflict);
                }
                else
                {
                    throw;
                }
            }

            return Ok(book);
        }

        // DELETE: api/Books/5
        [ResponseType(typeof(Book))]
        public IHttpActionResult DeleteBook(Guid id)
        {
            Book book = db.Books.Find(id);
            if (book == null)
            {
                return NotFound();
            }

            db.Books.Remove(book);
            db.SaveChanges();

            return Ok(book);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BookExists(Guid id)
        {
            return db.Books.Count(e => e.GUID == id) > 0;
        }
    }
}
